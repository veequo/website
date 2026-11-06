import imageLabels from './imagenet.json';
export type Task = 'Detection' | 'Classification' | 'Segmentation';
export type Detection = {label: string; score: number; box: [number, number, number, number]; mask?: string; candidate?: number};
type Tensor = {data: Float32Array; dims: number[]};
type Session = {inputNames: string[]; outputNames: string[]; run: (feeds: Record<string, Tensor>) => Promise<Record<string, Tensor>>};
type Runtime = {env: {wasm: {wasmPaths: string; numThreads: number}}; Tensor: new (type: string, data: Float32Array, dims: number[]) => Tensor; InferenceSession: {create: (path: string, options: object) => Promise<Session>}};
declare global {interface Window {ort?: Runtime}}
const labels = 'person,bicycle,car,motorcycle,airplane,bus,train,truck,boat,traffic light,fire hydrant,stop sign,parking meter,bench,bird,cat,dog,horse,sheep,cow,elephant,bear,zebra,giraffe,backpack,umbrella,handbag,tie,suitcase,frisbee,skis,snowboard,sports ball,kite,baseball bat,baseball glove,skateboard,surfboard,tennis racket,bottle,wine glass,cup,fork,knife,spoon,bowl,banana,apple,sandwich,orange,broccoli,carrot,hot dog,pizza,donut,cake,chair,couch,potted plant,bed,dining table,toilet,tv,laptop,mouse,remote,keyboard,cell phone,microwave,oven,toaster,sink,refrigerator,book,clock,vase,scissors,teddy bear,hair drier,toothbrush'.split(',');
const sessions = new Map<Task, Promise<{runtime: Runtime; session: Session}>>();
async function load(task: Task) {
  if (!sessions.has(task)) sessions.set(task, (async () => {
    if (!window.ort) await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/model-explorer/runtime/ort.wasm.min.js';
      script.onload = () => resolve();
      script.onerror = () => {script.remove(); reject(new Error('The inference runtime could not load. Please retry.'));};
      document.head.appendChild(script);
    });
    const runtime = window.ort!;
    runtime.env.wasm.wasmPaths = '/model-explorer/runtime/';
    runtime.env.wasm.numThreads = 1;
    const session = await runtime.InferenceSession.create(`/model-explorer/${task === 'Detection' ? 'yolo11n' : task === 'Classification' ? 'yolo11n-cls' : 'yolo11n-seg'}.onnx`, {executionProviders: ['wasm']});
    return {runtime, session};
  })().catch(error => {sessions.delete(task); throw error;}));
  return sessions.get(task)!;
}
export function overlap(a: Detection['box'], b: Detection['box']) {
  const intersection = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  const union = (a[2]-a[0])*(a[3]-a[1]) + (b[2]-b[0])*(b[3]-b[1]) - intersection;
  return union > 0 ? intersection / union : 0;
}
export function suppress(candidates: Detection[]) {
  const kept: Detection[] = [];
  for (const candidate of [...candidates].sort((a,b) => b.score-a.score)) {
    if (!kept.some(other => other.label === candidate.label && overlap(other.box, candidate.box) > .45)) kept.push(candidate);
    if (kept.length === 100) break;
  }
  return kept;
}
export async function detect(canvas: HTMLCanvasElement, task: Task = 'Detection'): Promise<Detection[]> {
  const {runtime, session} = await load(task);
  const size = task === 'Classification' ? 224 : 640, inputHeight = task === 'Segmentation' ? 480 : size;
  const scale = Math.min(size/canvas.width, inputHeight/canvas.height);
  const width = Math.round(canvas.width*scale), height = Math.round(canvas.height*scale);
  const left = Math.floor((size-width)/2), top = Math.floor((inputHeight-height)/2);
  const input = document.createElement('canvas'); input.width = size; input.height = inputHeight;
  const ctx = input.getContext('2d')!;
  ctx.fillStyle = 'rgb(114,114,114)'; ctx.fillRect(0,0,size,inputHeight);
  if (task === 'Classification') {
    const side = Math.min(canvas.width, canvas.height);
    ctx.drawImage(canvas,(canvas.width-side)/2,(canvas.height-side)/2,side,side,0,0,size,size);
  } else ctx.drawImage(canvas,left,top,width,height);
  const rgba = ctx.getImageData(0,0,size,inputHeight).data, data = new Float32Array(3*size*inputHeight);
  for (let i=0;i<size*inputHeight;i++) for (let c=0;c<3;c++) data[c*size*inputHeight+i] = rgba[i*4+c]/255;
  const output = await session.run({[session.inputNames[0]]: new runtime.Tensor('float32',data,[1,3,inputHeight,size])});
  if (task === 'Classification') {
    const result = output[session.outputNames[0]];
    if (result.dims.length !== 2 || result.dims[1] !== 1000) throw new Error('Unexpected classification output shape.');
    return Array.from(result.data, (score, i): Detection => ({label: imageLabels[i], score, box: [0,0,1,1]})).sort((a,b)=>b.score-a.score).slice(0,5);
  }
  const result = Object.values(output).find(t => t.dims.length === 3)!;
  if (!result || result.dims[1] !== (task === 'Segmentation' ? 116 : 84)) throw new Error('Unexpected YOLO11 output shape.');
  const count = result.dims[2], values = result.data, candidates: Detection[] = [];
  for (let i=0;i<count;i++) {
    let score=0, classId=0;
    for (let c=0;c<80;c++) if (values[(c+4)*count+i]>score) {score=values[(c+4)*count+i]; classId=c;}
    if (score<.05) continue;
    const x=values[i], y=values[count+i], w=values[count*2+i], h=values[count*3+i];
    const clamp=(v:number)=>Math.max(0,Math.min(1,v));
    candidates.push({label:labels[classId],score,candidate:i,box:[clamp((x-w/2-left)/width),clamp((y-h/2-top)/height),clamp((x+w/2-left)/width),clamp((y+h/2-top)/height)]});
  }
  const kept = suppress(candidates);
  if (task === 'Segmentation') {
    const proto = Object.values(output).find(t => t.dims.length === 4);
    if (!proto || proto.dims[1] !== 32) throw new Error('Unexpected segmentation mask shape.');
    const [,channels,mh,mw] = proto.dims, area = mh*mw;
    for (const d of kept) {
      const mask = document.createElement('canvas'); mask.width=mw; mask.height=mh;
      const context=mask.getContext('2d')!, pixels=context.createImageData(mw,mh);
      for(let y=0;y<mh;y++) for(let x=0;x<mw;x++) {
        const nx=((x+.5)*size/mw-left)/width, ny=((y+.5)*inputHeight/mh-top)/height;
        if(nx<d.box[0]||nx>d.box[2]||ny<d.box[1]||ny>d.box[3]) continue;
        let logit=0; for(let c=0;c<channels;c++) logit+=values[(84+c)*count+d.candidate!]*proto.data[c*area+y*mw+x];
        if(logit>0) {const offset=(y*mw+x)*4; pixels.data.set([169,231,204,150],offset);}
      }
      context.putImageData(pixels,0,0);
      const cropped=document.createElement('canvas'); cropped.width=Math.max(1,Math.round(width/size*mw)); cropped.height=Math.max(1,Math.round(height/inputHeight*mh));
      cropped.getContext('2d')!.drawImage(mask,left/size*mw,top/inputHeight*mh,width/size*mw,height/inputHeight*mh,0,0,cropped.width,cropped.height);
      d.mask=cropped.toDataURL();
    }
  }
  return kept;
}
