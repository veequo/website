'use client';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {detect, type Detection, type Task} from './inference';
import {stages as detectionStages, questions, code as detectionCode} from './content';
import s from './explorer.module.css';
const samples = [{name:'A city afternoon',src:'/model-explorer/bus.jpg',caption:'People, a bus, and a busy street'}, {name:'On the pitch',src:'/model-explorer/football.jpg',caption:'People and partly hidden objects'}];
const colors = ['#f3c64d','#f9a58f','#a9e7cc','#d9c0ef'];
export default function Explorer() {
  const [view,setView]=useState('Understand'), [stage,setStage]=useState(0), [task,setTask]=useState<Task>('Detection');
  const [source,setSource]=useState(samples[0].src), [name,setName]=useState(samples[0].name), [threshold,setThreshold]=useState(.4), [dark,setDark]=useState(false);
  const [detections,setDetections]=useState<Detection[]|null>(null), [baseline,setBaseline]=useState<Detection[]|null>(null), [busy,setBusy]=useState(false), [error,setError]=useState(''), [ready,setReady]=useState(false);
  const [answers,setAnswers]=useState<Record<number,number>>({}),[copied,setCopied]=useState(false);
  const canvas=useRef<HTMLCanvasElement>(null), revision=useRef(0), upload=useRef<string|null>(null);
  const classification=task==='Classification';
  const model=classification?'YOLO11n-cls':task==='Segmentation'?'YOLO11n-seg':'YOLO11n';
  const stages=detectionStages.map((item,i)=>task==='Detection'?item:{...item,
    text: i===1 ? (classification?'The image is center-cropped to a square, resized to 224 × 224, and normalized to 0–1. Objects near the edges may be cropped out.':'The image is resized and padded to 640 × 480, preserving its proportions.') : i===3 ? (classification?'The classification model scores 1,000 ImageNet classes for the whole image.':'The segmentation model predicts boxes, class scores, and coefficients that combine learned mask prototypes into object regions.') : i===4 ? (classification?'The five highest-scoring classes are ranked. The confidence slider filters these five labels.':'Overlapping same-class boxes are suppressed. Mask logits above zero mark foreground pixels inside each retained box.') : i===5 ? (classification?'Read the ranked labels below the image. Classification does not locate individual objects.':'Masks are mapped back to the original image and shown as translucent regions with object boxes.') : item.text,
    detail:i===1?(classification?'PREPARE / Center crop + resize':'PREPARE / Letterbox 640 × 480'):i===3?'PREDICT / '+task:i===5?'OUTPUT / '+(classification?'Ranked labels':'Object masks'):item.detail});
  const code=task==='Detection'?detectionCode:`# Install: pip install ultralytics\nfrom ultralytics import YOLO\n\nmodel = YOLO("${model.toLowerCase()}.pt")\nresult = model.predict("your-image.jpg", imgsz=${classification?'224':'(480, 640)'})[0]\n${classification?'for i in result.probs.top5:\n    print(result.names[i], float(result.probs.data[i]))':'print(result.boxes)\nprint(result.masks)\nresult.save(filename="segments.jpg")'}`;
  function changeTask(next:Task){revision.current++;setTask(next);setDetections(null);setBaseline(null);setError('');setCopied(false);setThreshold(next==='Classification'?.05:.4);}
  const shown=(detections??[]).filter(d=>d.score>=threshold);
  useEffect(()=>{
    let active=true; setReady(false); setDetections(null); setError(''); revision.current++;
    const img=new Image();
    img.onload=()=>{
      if(!active||!canvas.current) return;
      const c=canvas.current; const scale=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight));
      c.width=Math.round(img.naturalWidth*scale); c.height=Math.round(img.naturalHeight*scale);
      const ctx=c.getContext('2d')!; ctx.filter=dark?'brightness(35%)':'none'; ctx.drawImage(img,0,0,c.width,c.height); ctx.filter='none';setReady(true);
    };
    img.onerror=()=>{if(active)setError('This image could not be opened. Try a JPEG, PNG, or WebP file.');};img.src=source;
    return ()=>{active=false;};
  },[source,dark]);
  useEffect(()=>()=>{if(upload.current)URL.revokeObjectURL(upload.current);},[]);
  function choose(src:string,title:string){revision.current++;setSource(src);setName(title);setDark(false);setBaseline(null);setDetections(null);setError('');}
  async function run(){
    if(!canvas.current||!ready||busy)return;
    const current=revision.current;setBusy(true);setError('');
    try{const result=await detect(canvas.current,task);if(current===revision.current){setDetections(result);if(!dark)setBaseline(result);}}
    catch(e){if(current===revision.current)setError(`${task} could not finish. ${e instanceof Error?e.message:'Please retry in a recent browser.'}`);}
    finally{setBusy(false);}
  }
  async function pick(file?:File){
    if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){setError('Choose a JPEG, PNG, or WebP image under 10 MB.');return;}
    try {const bitmap=await createImageBitmap(file);const tooLarge=bitmap.width*bitmap.height>25000000;bitmap.close();if(tooLarge){setError('Please choose an image under 25 megapixels.');return;}}
    catch {setError('This file could not be read as an image.');return;}
    if(upload.current)URL.revokeObjectURL(upload.current);upload.current=URL.createObjectURL(file);choose(upload.current,file.name);
  }
  return <div className={s.explorer}>
    <div className={s.breadcrumb}><Link href="/learn">Learn</Link><span>/</span><span>Model explorer</span><span className={s.lab}>VEQO LEARNING LAB · 01</span></div>
    <section className={s.hero}>
      <div><p className={s.eyebrow}>A little curiosity. A whole new perspective.</p><h1>See what a<br/>model <em>sees.</em></h1><p className={s.intro}>Less black box. More “oh, I get it.” Explore how AI finds objects in an image, one discovery at a time.</p><div className={s.heroMeta}><span>✳ Beginner friendly</span><span>◷ Explore at your own pace</span></div></div>
      <div className={s.heroArt} aria-label="Illustration of an object detector finding a plant and a cup">
        <span className={s.artNote}>THE EVERYDAY, THROUGH AI EYES ↙</span>
        <svg viewBox="0 0 500 320" role="img" aria-label="Illustrated plant and cup with example detection boxes">
          <path d="M35 271 Q247 240 466 273" fill="none" stroke="#56316d" strokeWidth="2"/>
          <ellipse cx="219" cy="284" rx="163" ry="15" fill="#56316d" opacity=".08"/>
          <path d="M128 207 L144 278 Q184 291 220 275 L234 207Z" fill="#f17c67" stroke="#56316d" strokeWidth="3"/>
          <ellipse cx="181" cy="207" rx="53" ry="12" fill="#56316d"/>
          <path d="M182 209 Q178 154 187 81 M184 163 Q135 141 124 106 M183 141 Q226 120 236 84" fill="none" stroke="#56316d" strokeWidth="4"/>
          <path d="M186 112 Q146 96 171 47 Q210 63 186 112 M165 161 Q116 170 101 115 Q148 107 165 161 M193 145 Q248 150 259 100 Q215 91 193 145" fill="#a9b68c" stroke="#56316d" strokeWidth="2"/>
          <path d="M310 210 H379 L370 275 H318Z" fill="#f3c64d" stroke="#56316d" strokeWidth="3"/><path d="M378 219 Q414 216 402 246 Q397 259 375 253" fill="none" stroke="#56316d" strokeWidth="5"/>
          <path d="M335 193 Q323 180 336 165 M355 193 Q344 177 358 164" stroke="#56316d" fill="none" strokeWidth="2"/>
          <rect x="89" y="37" width="180" height="255" rx="7" fill="none" stroke="#56316d" strokeWidth="2" strokeDasharray="8 5"/>
          <rect x="298" y="198" width="119" height="91" rx="5" fill="none" stroke="#56316d" strokeWidth="2"/>
          <rect x="89" y="17" width="133" height="25" rx="5" fill="#56316d"/><text x="99" y="34" fill="#fff8ed" fontSize="12" fontFamily="monospace">potted plant 0.94</text>
          <rect x="298" y="177" width="88" height="25" rx="5" fill="#56316d"/><text x="308" y="194" fill="#fff8ed" fontSize="12" fontFamily="monospace">cup 0.87</text>
          <path d="M400 49 l8 19 20 2 -15 14 4 20 -18 -10 -18 10 5 -20 -15 -14 21 -2Z" fill="#f3c64d"/>
        </svg>
        <small>Illustration only · example boxes and scores</small>
      </div>
    </section>
    <section className={s.taskbar} aria-label="Choose your learning task"><span className={s.eyebrow}>01 / What do you want to do?</span><div className={s.taskChoices}>{(['Detection','Classification','Segmentation'] as Task[]).map(t=><button key={t} aria-pressed={task===t} disabled={busy} onClick={()=>changeTask(t)}>{t==='Detection'?'⌗':t==='Classification'?'◇':'▨'} {t}</button>)}</div><p>{task==='Detection'?'Find objects and where they are. That’s our adventure today.':task==='Classification'?'Classify the whole image with ranked ImageNet labels.':'Find individual objects and highlight their predicted pixel regions.'}</p></section>
    <div className={s.workspaceHead}><div><span className={s.eyebrow}>Your model, under the magnifying glass</span><h2>Meet {model}<span className={s.nano}>NANO</span></h2></div><p>{classification?'Image classification · 1,000 ImageNet classes':`${task} · 80 COCO classes`}<br/><small>Small model. Plenty to discover.</small></p></div>
    <nav className={s.tabs} aria-label="Explorer views">{['Understand','Try it','Build with it'].map((v,i)=><button key={v} aria-current={view===v?'page':undefined} onClick={()=>setView(v)}><span>0{i+1}</span>{v}<span aria-hidden="true">{view===v?'↗':'→'}</span></button>)}</nav>
    <section hidden={view!=='Understand'} className={s.panel}>
      <div className={s.modelIntro}><h3>One image.<br/>Many little discoveries.</h3><p>YOLO means “You Only Look Once.” {classification?'This model predicts labels for the whole image.':task==='Segmentation'?'This model predicts object locations, classes, and pixel masks.':'This model predicts object locations and classes in one forward pass.'} Try it for everyday scenes, counting objects, or a first computer vision project.</p><aside><strong>A useful starting point, not a perfect observer.</strong><p>Small, hidden, dark, or unfamiliar objects can be missed. It only recognizes its {classification?'1,000 ImageNet':'80 COCO'} training classes.</p></aside></div>
      <div className={s.pipelineHead}><div><span className={s.eyebrow}>Follow the pixels</span><h3>From image to “there it is.”</h3></div><small>Choose a stage to peek inside ↓</small></div>
      <div className={s.pipeline}>{stages.map((item,i)=><button key={item.name} aria-pressed={stage===i} onClick={()=>setStage(i)}><span>{item.icon}</span><small>0{i+1}</small><strong>{item.name}</strong>{i<5&&<b aria-hidden="true">→</b>}</button>)}</div>
      <div className={s.stageDetail}><div className={s.stageVisual} data-stage={stage}><span className={s.giant}>{stages[stage].icon}</span><div className={s.miniTiles}>{[0,1,2,3,4,5,6,7,8].map(i=><i key={i} style={{opacity:.25+(i%4)*.2}}/>)}</div><small>Concept illustration · not model activations</small></div><div><span className={s.eyebrow}>{stages[stage].detail}</span><h3>{stages[stage].title}</h3><p>{stages[stage].text}</p><div className={s.stageNav}><button disabled={stage===0} onClick={()=>setStage(stage-1)}>← Previous</button><small>{stage+1} of 6</small><button onClick={()=>stage===5?setView('Try it'):setStage(stage+1)}>{stage===5?'Try an image ↗':'Next stage →'}</button></div></div></div>
      <div className={s.callout}><span>✳</span><div><strong>The best way to understand? Change something.</strong><p>Try a photo, raise the threshold, and watch which predictions stay.</p></div><button className={s.primary} onClick={()=>setView('Try it')}>Let’s try it ↗</button></div>
    </section>
    <section hidden={view!=='Try it'} className={s.panel}>
      <div className={s.tryHeading}><div><span className={s.eyebrow}>Your turn to explore</span><h3>A photo. A prediction. A little perspective.</h3></div><span className={s.privacy}>↳ Runs on your device</span></div>
      <div className={s.tryGrid}><div><div className={s.photoTop}><span>{name}</span><span>{dark?'Darker image':'Original image'}</span></div><div className={s.photo}><canvas ref={canvas} aria-label={`Input image: ${name}${dark?', darkened to 35% brightness':''}`}/>{detections&&!classification&&<svg className={s.boxes} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label={`${shown.length} detections; details listed below`}>{shown.map((d,i)=><g key={i}>{d.mask&&<image href={d.mask} x="0" y="0" width="1000" height="1000" preserveAspectRatio="none"/>}<rect x={d.box[0]*1000} y={d.box[1]*1000} width={(d.box[2]-d.box[0])*1000} height={(d.box[3]-d.box[1])*1000} fill="none" stroke={colors[i%4]} strokeWidth="4"/><rect x={d.box[0]*1000} y={Math.max(0,d.box[1]*1000-28)} width={Math.min(240,1000-d.box[0]*1000)} height="28" fill={colors[i%4]}/><text x={d.box[0]*1000+5} y={Math.max(20,d.box[1]*1000-7)} fill="#271d32" fontSize="20" fontFamily="monospace">{d.label} {d.score.toFixed(2)}</text></g>)}</svg>}</div><div className={s.photoCaption}><span>{detections?`Actual ${model} predictions`:`Choose an image, then run ${task.toLowerCase()}`}</span><small>Images stay in your browser</small></div><div className={s.samples}>{samples.map(sample=><button key={sample.src} disabled={busy} aria-pressed={source===sample.src} onClick={()=>choose(sample.src,sample.name)}><span>{sample.name}</span><small>{sample.caption}</small></button>)}<label className={s.upload}>＋ Your image<input disabled={busy} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void pick(e.target.files?.[0]);e.target.value='';}}/><small>JPG, PNG, WebP · up to 10 MB</small></label></div></div>
      <aside className={s.controls}><span className={s.eyebrow}>The experiment bench</span><h3>What can you spot?</h3><p>Run the model, then compare its predictions with what you see.</p><button disabled={busy||!ready} className={s.primary} onClick={run}>{busy?`Running ${model}…`:detections?'Run again ↻':classification?'Classify image ↗':task==='Segmentation'?'Segment objects ↗':'Detect objects ↗'}</button><small>First use downloads the shared runtime and the selected model (about 11 MB per model). It may take a moment.</small><div role="status" aria-live="polite">{busy&&<p>Preparing {model} and running {task.toLowerCase()}…</p>}{error&&<p className={s.error}>{error}</p>}</div><div className={s.divider}/><label htmlFor="confidence">Confidence threshold <strong>{Math.round(threshold*100)}%</strong></label><input id="confidence" type="range" min="5" max="95" step="1" value={Math.round(threshold*100)} onChange={e=>setThreshold(Number(e.target.value)/100)}/><div className={s.rangeLabels}><span>More predictions</span><span>Stronger scores</span></div><p className={s.insight} aria-live="polite">{detections?`${shown.length} of ${detections.length} ${classification?'top-five labels':'post-suppression predictions'} remain at ${Math.round(threshold*100)}%. Raising the threshold can hide real objects as well as mistakes.`:'A threshold decides which model scores are high enough to show.'}</p><label className={s.toggle}><input type="checkbox" checked={dark} disabled={busy} onChange={e=>{revision.current++;setDark(e.target.checked);setDetections(null);}}/> Make the image darker</label><small>This changes the input pixels. Run {task.toLowerCase()} again to see what changes.</small>{dark&&detections&&baseline&&<p className={s.insight}>At this threshold, the original had {baseline.filter(d=>d.score>=threshold).length} detections; the darker image has {shown.length}. Compare the labels and boxes too—counts alone don’t tell the whole story.</p>}</aside></div>
      {detections&&<div className={s.results}><h3>{shown.length?`${shown.length} things to look closer at.`:'No predictions at this threshold.'}</h3><p>A score is model confidence, not a guarantee. {classification?'Labels describe the center crop, not every object in the scene.':'Boxes and masks can be wrong, and objects can be missed.'}</p>{shown.length===0&&<p>Try lowering the threshold or choosing a clearer photo.</p>}<div className={s.resultList}>{shown.map((d,i)=><div key={i}><span style={{background:colors[i%4]}}>{String(i+1).padStart(2,'0')}</span><strong>{d.label}</strong><meter min={0} max={1} value={d.score} aria-label={`${d.label} confidence`}/><b>{(d.score*100).toFixed(1)}%</b></div>)}</div></div>}
    </section>
    <section hidden={view!=='Build with it'} className={s.panel}><div className={s.buildGrid}><div><span className={s.eyebrow}>From a little “aha” to your own idea</span><h3>Make something<br/>with what you learned.</h3><p>Start with a local image and the {model} weights. This Python example uses Ultralytics; the explorer uses an ONNX export in your browser.</p><dl><dt>Input</dt><dd>{classification?'An RGB image, center-cropped and resized to 224 × 224.':`An RGB image, resized and padded to ${task==='Segmentation'?'640 × 480':'640 × 640'}.`}</dd><dt>Output</dt><dd>{classification?'Ranked image labels and confidence scores.':task==='Segmentation'?'Class labels, scores, boxes, and per-object pixel masks.':'Class labels, scores, and box coordinates in original-image pixels.'}</dd><dt>Try next</dt><dd>Compare bright and dim scenes. Record missed objects and incorrect labels, not just the number of boxes.</dd></dl><a href="https://docs.ultralytics.com/models/yolo11/" target="_blank" rel="noreferrer">Explore the YOLO11 documentation ↗</a><p className={s.license}>YOLO11 weights use the Ultralytics AGPL-3.0 license. Review the <a href="https://www.ultralytics.com/license" target="_blank" rel="noreferrer">license terms</a> before distributing a project.</p></div><div className={s.code}><div><span>your_first_{task.toLowerCase()}.py</span><button onClick={async()=>{try{await navigator.clipboard.writeText(code);setCopied(true);}catch{setCopied(false);}}}>{copied?'Copied ✓':'Copy code'}</button></div><pre><code>{code}</code></pre></div></div></section>
    <section className={s.quiz}><div><span className={s.eyebrow}>A tiny check-in</span><h2>Did it click?</h2><p>Three questions. No grades.<br/>Just a chance to connect the dots.</p><span className={s.quizCount}>{questions.filter((q,i)=>answers[i]===q.answer).length} / 3 understood</span></div><div>{questions.map((q,i)=><fieldset key={q.q}><legend><span>0{i+1}</span> {q.q}</legend><div className={s.answers}>{q.options.map((option,j)=><button key={option} aria-pressed={answers[i]===j} onClick={()=>setAnswers({...answers,[i]:j})}>{option}</button>)}</div>{answers[i]!==undefined&&<p role="status" className={s.feedback}><strong>{answers[i]===q.answer?'That’s it. ':'Not quite—try again. '}</strong>{q.explanation}</p>}</fieldset>)}</div></section>
    <div className={s.endnote}><span>✳</span><p>You don’t need to know everything to start.<br/><strong>Just stay curious about what happens next.</strong></p><Link href="/student-projects">Explore more possibilities ↗</Link></div>
  </div>;
}
