'use client';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {detect, type Detection} from './inference';
import s from './explorer.module.css';

const samples = [
  {name:'A city afternoon',src:'/model-explorer/bus.jpg',caption:'A busy street'},
  {name:'On the pitch',src:'/model-explorer/football.jpg',caption:'A football match'},
];
const colors = ['#f3c64d','#f9a58f','#a9e7cc','#d9c0ef'];

export default function Explorer() {
  const [source,setSource]=useState(samples[0].src);
  const [name,setName]=useState(samples[0].name);
  const [threshold,setThreshold]=useState(.4);
  const [detections,setDetections]=useState<Detection[]|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [ready,setReady]=useState(false);
  const canvas=useRef<HTMLCanvasElement>(null);
  const revision=useRef(0);
  const upload=useRef<string|null>(null);
  const shown=(detections??[]).filter(d=>d.score>=threshold);

  useEffect(()=>{
    let active=true;
    setReady(false);
    setDetections(null);
    setError('');
    revision.current++;
    const img=new Image();
    img.onload=()=>{
      if(!active||!canvas.current)return;
      const c=canvas.current;
      const scale=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight));
      c.width=Math.round(img.naturalWidth*scale);
      c.height=Math.round(img.naturalHeight*scale);
      c.getContext('2d')!.drawImage(img,0,0,c.width,c.height);
      setReady(true);
    };
    img.onerror=()=>{if(active)setError('This image could not be opened. Try a JPEG, PNG, or WebP file.');};
    img.src=source;
    return ()=>{active=false;};
  },[source]);

  useEffect(()=>()=>{if(upload.current)URL.revokeObjectURL(upload.current);},[]);

  function choose(src:string,title:string){
    revision.current++;
    setSource(src);
    setName(title);
    setDetections(null);
    setError('');
  }

  async function run(){
    if(!canvas.current||!ready||busy)return;
    const current=revision.current;
    setBusy(true);
    setError('');
    try{
      const result=await detect(canvas.current,'Detection');
      if(current===revision.current)setDetections(result);
    }catch(e){
      if(current===revision.current)setError(`Detection could not finish. ${e instanceof Error?e.message:'Please retry in a recent browser.'}`);
    }finally{setBusy(false);}
  }

  async function pick(file?:File){
    if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){setError('Choose a JPEG, PNG, or WebP image under 10 MB.');return;}
    try{
      const bitmap=await createImageBitmap(file);
      const tooLarge=bitmap.width*bitmap.height>25000000;
      bitmap.close();
      if(tooLarge){setError('Please choose an image under 25 megapixels.');return;}
    }catch{setError('This file could not be read as an image.');return;}
    if(upload.current)URL.revokeObjectURL(upload.current);
    upload.current=URL.createObjectURL(file);
    choose(upload.current,file.name);
  }

  return <div className={s.explorer}>
    <div className={s.breadcrumb}><Link href="/learn">Learn</Link><span>/</span><span>YOLO object detection</span></div>

    <header className={s.intro}>
      <span className={s.eyebrow}>YOLO11n / Object detection</span>
      <h1>How does YOLO find objects?</h1>
      <p>YOLO looks at an image once and predicts what objects may be there and where they are. Try it below.</p>
    </header>

    <section className={s.overview} aria-label="What happens to an image">
      <div><span>01</span><strong>Prepare the image</strong><p>Resize it for the model.</p></div>
      <b aria-hidden="true">→</b>
      <div><span>02</span><strong>Predict objects</strong><p>Estimate labels and locations.</p></div>
      <b aria-hidden="true">→</b>
      <div><span>03</span><strong>Show results</strong><p>Filter scores and draw boxes.</p></div>
    </section>

    <section className={s.lab} aria-labelledby="try-title">
      <div className={s.labHeading}>
        <div><span className={s.eyebrow}>Interactive demo</span><h2 id="try-title">Try it on an image</h2></div>
        <span className={s.privacy}>Runs in your browser</span>
      </div>

      <div className={s.tryGrid}>
        <div>
          <div className={s.photoTop}><span>{name}</span><span>{detections?'YOLO predictions':'Input image'}</span></div>
          <div className={s.photo}>
            <canvas ref={canvas} aria-label={`Input image: ${name}`}/>
            {detections&&<svg className={s.boxes} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label={`${shown.length} detections; details listed below`}>
              {shown.map((d,i)=><g key={i}>
                <rect x={d.box[0]*1000} y={d.box[1]*1000} width={(d.box[2]-d.box[0])*1000} height={(d.box[3]-d.box[1])*1000} fill="none" stroke={colors[i%4]} strokeWidth="4"/>
                <rect x={d.box[0]*1000} y={Math.max(0,d.box[1]*1000-28)} width={Math.min(240,1000-d.box[0]*1000)} height="28" fill={colors[i%4]}/>
                <text x={d.box[0]*1000+5} y={Math.max(20,d.box[1]*1000-7)} fill="#271d32" fontSize="20" fontFamily="monospace">{d.label} {d.score.toFixed(2)}</text>
              </g>)}
            </svg>}
          </div>
          <div className={s.photoCaption}><span>{detections?`${shown.length} predictions shown`:'Choose a sample or upload an image'}</span><small>Images stay in your browser</small></div>
          <div className={s.samples}>
            {samples.map(sample=><button key={sample.src} disabled={busy} aria-pressed={source===sample.src} onClick={()=>choose(sample.src,sample.name)}><span>{sample.name}</span><small>{sample.caption}</small></button>)}
            <label className={s.upload}>＋ Upload an image<input disabled={busy} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void pick(e.target.files?.[0]);e.target.value='';}}/><small>JPG, PNG, WebP · up to 10 MB</small></label>
          </div>
        </div>

        <aside className={s.controls}>
          <h3>Run YOLO11n</h3>
          <p>It predicts object labels and boxes. Raise the threshold to hide lower scoring predictions.</p>
          <button disabled={busy||!ready} className={s.primary} onClick={run}>{busy?'Running…':detections?'Run again':'Detect objects'}</button>
          <small>First run downloads the model and browser runtime (about 24 MB).</small>
          <div role="status" aria-live="polite">{busy&&<p>Loading the model and detecting objects…</p>}{error&&<p className={s.error}>{error}</p>}</div>
          <div className={s.divider}/>
          <label htmlFor="confidence">Confidence threshold <strong>{Math.round(threshold*100)}%</strong></label>
          <input id="confidence" type="range" min="5" max="95" step="1" value={Math.round(threshold*100)} onChange={e=>setThreshold(Number(e.target.value)/100)}/>
          <div className={s.rangeLabels}><span>More boxes</span><span>Fewer, higher scores</span></div>
          {detections&&<p className={s.insight} aria-live="polite">Showing {shown.length} of {detections.length} predictions. A higher score does not guarantee a correct result.</p>}
        </aside>
      </div>

      {detections&&<div className={s.results}>
        <h3>{shown.length?`${shown.length} predictions`:'No predictions at this threshold'}</h3>
        {shown.length===0&&<p>Lower the threshold to show more predictions.</p>}
        <div className={s.resultList}>{shown.map((d,i)=><div key={i}><span style={{background:colors[i%4]}}>{String(i+1).padStart(2,'0')}</span><strong>{d.label}</strong><meter min={0} max={1} value={d.score} aria-label={`${d.label} confidence`}/><b>{(d.score*100).toFixed(1)}%</b></div>)}</div>
      </div>}
    </section>
  </div>;
}
