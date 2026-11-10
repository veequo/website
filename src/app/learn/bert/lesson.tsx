'use client';

import {useState} from 'react';
import Link from 'next/link';
import data from './examples.json';
import {stages, quiz, pythonExample} from './content';
import s from './lesson.module.css';

export default function BertLesson() {
  const [view, setView] = useState('Understand');
  const [context, setContext] = useState(0);
  const [stage, setStage] = useState(0);
  const [sentence, setSentence] = useState(0);
  const [token, setToken] = useState(6);
  const [layer, setLayer] = useState(0);
  const [head, setHead] = useState(0);
  const [compare, setCompare] = useState(1);
  const [mask, setMask] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [copyStatus, setCopyStatus] = useState('');
  const example = data.examples[sentence];

  function attentionChart(headIndex: number) {
    const weights = example.attention[layer][headIndex][token];
    return <div className={s.chart}>
      <h4>Head {headIndex + 1}</h4>
      <p>From <strong>{example.tokens[token]}</strong> to each token</p>
      <ol>{example.tokens.map((word, i) => <li key={i}>
        <span>{word}</span><div className={s.track}><div style={{width: `${weights[i] * 100}%`}}/></div><span>{(weights[i] * 100).toFixed(1)}%</span>
      </li>)}</ol>
    </div>;
  }

  return <div className={s.page}>
    <nav className={s.breadcrumb} aria-label="Breadcrumb"><Link href="/learn">Learn</Link><span aria-hidden="true">/</span><span>BERT & context</span></nav>
    <section className={s.hero}>
      <div><span className={s.eyebrow}>Language, under the magnifying glass</span><h1>Same word.<br/>Different <em>meaning.</em></h1><p>How do you know whether “bank” means a place for money or the edge of a river? Look at the company it keeps. Let’s explore how BERT builds context.</p><div className={s.badges}><span>Beginner friendly</span><span>Real model examples</span></div><a className={s.primary} href="#lesson">Explore the sentence ↓</a></div>
      <div className={s.heroArt} aria-label="Illustration: bank connected to money and river"><span className={s.eyebrow}>A word in good company</span><div className={s.wordPair}><span>money</span><span>river</span></div><svg viewBox="0 0 320 90" aria-hidden="true"><path d="M70 0Q70 65 160 85M250 0Q250 65 160 85" fill="none" stroke="currentColor" strokeWidth="2"/></svg><strong>bank</strong><small>One spelling. Context changes the representation.</small></div>
    </section>
    <nav id="lesson" className={s.tabs} aria-label="Lesson sections">{['Understand', 'Try it', 'Build with it'].map((item, i) => <button key={item} aria-pressed={view === item} onClick={() => setView(item)}><span>0{i + 1}</span>{item}<span aria-hidden="true">↗</span></button>)}</nav>

    {view === 'Understand' && <div className={s.panel}>
      <section className={s.section}><span className={s.eyebrow}>01 / Context changes things</span><h2>A word doesn’t stand alone.</h2><div className={s.choices}>{['A place for money', 'The edge of a river'].map((label, i) => <button key={label} aria-pressed={context === i} onClick={() => setContext(i)}>{label}</button>)}</div><div className={s.sentence}>{context === 0 ? <>She <mark>deposited money</mark> at the <strong>bank</strong>.</> : <>She sat beside the <mark>river</mark> <strong>bank</strong>.</>}</div><p className={s.caption}>Teaching illustration · highlighted clues are chosen by us, not an attention map.</p><p>The spelling stays the same. The surrounding words change. BERT builds a different numerical representation for “bank” in each context—not a written dictionary definition.</p></section>
      <section className={s.split}><div><span className={s.eyebrow}>02 / Meet BERT</span><h2>Both sides<br/>of the story.</h2></div><div><p><strong>Bidirectional Encoder Representations from Transformers.</strong> A token can use information from both sides of its position. BERT processes the supplied sequence together, rather than restricting each token to earlier words.</p><p>During pretraining, selected tokens are hidden or replaced and BERT learns to predict the original tokens. The original BERT also trained on a next-sentence prediction task.</p><aside className={s.note}>“Context” here means information represented in numbers. It does not imply human understanding or guarantee a correct prediction.</aside></div></section>
      <section className={s.section}><span className={s.eyebrow}>03 / Follow the tokens</span><h2>From a sentence to context.</h2><div className={s.stages}>{stages.map(([name], i) => <button key={name} aria-pressed={stage === i} onClick={() => setStage(i)}><small>0{i + 1}</small>{name}<span aria-hidden="true">→</span></button>)}</div><div className={s.stageDetail} aria-live="polite"><span className={s.bigNumber}>0{stage + 1}</span><div><h3>{stages[stage][1]}</h3><p>{stages[stage][2]}</p></div></div></section>
      <section className={s.section}><span className={s.eyebrow}>04 / Inside one head</span><h2>Gather. Weight. Combine.</h2><p>For a selected token, an attention head calculates weights over the tokens it can attend to. It uses those weights to combine information from their value vectors.</p><div className={s.cards}>{[['Q', 'Query', 'What information am I looking for?'], ['K', 'Key', 'What can each token be matched on?'], ['V', 'Value', 'What information can each token contribute?']].map(([letter, title, text]) => <article key={letter}><span>{letter}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className={s.caption}>An analogy for learned numerical transformations—not literal questions and answers.</p><details className={s.details}><summary>Peek at the calculation</summary><code>Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V</code><p>Compare queries with keys. Scale the scores. Softmax turns each row into weights that sum to one. Use those weights to mix the values.</p></details></section>
      <section className={s.split}><div><span className={s.eyebrow}>05 / More than one view</span><h2>Heads alongside.<br/>Layers in sequence.</h2><p>BERT Base has 12 layers, with 12 attention heads in each layer. Each head uses its own learned query, key, and value transformations.</p><p>The outputs of the heads are joined and transformed. The next layer receives updated representations.</p></div><div className={s.layerDiagram}><span>Token representations ↓</span>{[1, 2, 12].map((n, i) => <div key={n}>{i === 2 && <p className={s.caption}>⋮ Layers 3–11</p>}<strong>Layer {n}</strong><div className={s.heads}>{Array.from({length:12}, (_, h) => <span key={h}>{h + 1}</span>)}</div><small>12 parallel heads → combine → refine ↓</small></div>)}<span>Contextual token representations</span></div></section>
      <aside className={s.note}><strong>No fixed job titles.</strong> Heads can learn different, overlapping patterns. They are not permanently assigned “grammar,” “meaning,” or “emotion.” Attention weights alone do not fully explain a prediction.</aside>
      <div className={s.callout}><div><h3>Change the view. Notice the pattern.</h3><p>Compare measured attention from different heads and layers.</p></div><button className={s.primary} onClick={() => {setView('Try it');document.getElementById('lesson')?.scrollIntoView({behavior:'instant'});}}>Try the examples ↗</button></div>
    </div>}

    {view === 'Try it' && <div className={s.panel}>
      <section className={s.section}><span className={s.eyebrow}>01 / Compare attention heads</span><h2>One sentence. Many connections.</h2><p>Choose a sentence, select a source token, then compare two heads. Each bar shows the fraction of that head’s attention assigned to a target token.</p><aside className={s.note}><strong>Actual BERT outputs, precomputed.</strong> These examples were generated with <code>{data.model}</code> in evaluation mode. Switching controls explores saved results; no model download or live inference is needed.</aside>
        <label className={s.label}>Sentence<select value={sentence} onChange={e => {const next = Number(e.target.value);setSentence(next);setToken(next === 2 ? 3 : 6);}}>{data.examples.map((item, i) => <option key={item.sentence} value={i}>{item.sentence}</option>)}</select></label>
        <p className={s.controlLabel}>Select the token that gathers information</p><div className={s.tokens}>{example.tokens.map((word, i) => <button key={i} aria-pressed={token === i} onClick={() => setToken(i)}>{word}</button>)}</div>
        <div className={s.controls}>{[['Layer', layer, setLayer], ['First head', head, setHead], ['Compare with', compare, setCompare]].map(([label, value, setter]) => <label key={label as string}>{label as string}<select value={value as number} onChange={e => (setter as (n: number) => void)(Number(e.target.value))}>{Array.from({length:12}, (_, i) => <option key={i} value={i}>{label === 'Layer' ? 'Layer' : 'Head'} {i + 1}</option>)}</select></label>)}</div>
        <div className={s.chartGrid}>{attentionChart(head)}{attentionChart(compare)}</div><p className={s.caption}>Weights sum to approximately 100% per chart; rounding may affect the displayed total. [CLS], [SEP], and punctuation are included. A large weight is not a confidence score or proof of causation.</p>
      </section>
      <section className={s.section}><span className={s.eyebrow}>02 / Fill the gap</span><h2>What fits in the middle?</h2><p>BERT assigns probabilities to vocabulary tokens that could replace [MASK]. Change the context and compare its five highest-scoring replacements.</p><label className={s.label}>Masked sentence<select value={mask} onChange={e => {setMask(Number(e.target.value));setRevealed(false);}}>{data.masks.map((item, i) => <option key={item.sentence} value={i}>{item.sentence}</option>)}</select></label><div className={s.sentence}>{data.masks[mask].sentence}</div><button className={s.primary} onClick={() => setRevealed(!revealed)} aria-expanded={revealed}>{revealed ? 'Hide predictions' : 'Reveal BERT’s predictions'}</button>{revealed && <ol className={s.predictions}>{data.masks[mask].predictions.map(item => <li key={item.token}><strong>{item.token}</strong><meter min="0" max="1" value={item.score} aria-label={`${item.token} model probability`}/><span>{(item.score * 100).toFixed(2)}%</span></li>)}</ol>}<p className={s.caption}>Precomputed model probabilities for these examples—not factual certainty. Only the top five vocabulary replacements are shown. Use the Python example to try your own sentence.</p></section>
      <section className={s.section}><span className={s.eyebrow}>03 / A quick check</span><h2>What did you discover?</h2><div className={s.quiz}>{quiz.map((q, i) => <fieldset key={q.question}><legend>{i + 1}. {q.question}</legend>{q.options.map((option, j) => <label key={option}><input type="radio" name={`question-${i}`} checked={answers[i] === j} onChange={() => setAnswers({...answers, [i]:j})}/>{option}</label>)}{answers[i] !== undefined && <p role="status"><strong>{answers[i] === q.answer ? 'That’s right. ' : 'Not quite. '}</strong>{q.explanation}</p>}</fieldset>)}</div></section>
    </div>}

    {view === 'Build with it' && <div className={s.panel}>
      <section className={s.section}><span className={s.eyebrow}>01 / Put context to work</span><h2>Representations become useful.</h2><p>A pretrained BERT encoder can be adapted to different tasks with suitable training and output layers.</p><div className={s.useCases}>{[['Text classification', 'Categorize a support message by topic.'], ['Named entity recognition', 'Identify people, organizations, and locations.'], ['Extractive question answering', 'Select the span in a passage that answers a question.'], ['Sentence-pair classification', 'Assess a relationship between two supplied sentences.']].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className={s.note}>A masked-word model is not automatically a sentiment classifier or question-answering system. Choose a model adapted to the task, or train the appropriate output layer.</aside></section>
      <section className={s.section}><span className={s.eyebrow}>02 / Your first experiment</span><h2>A sentence. A gap. Five possibilities.</h2><p>Run this in your own Python environment. The first run downloads the model. Enter one [MASK] token, then change the surrounding words and compare the predictions.</p><div className={s.codeTop}><span>Python / masked-token prediction</span><button onClick={async () => {try {await navigator.clipboard.writeText(pythonExample);setCopyStatus('Copied');} catch {setCopyStatus('Could not copy. Select the code below.');}}}>Copy code</button></div><pre className={s.code}><code>{pythonExample}</code></pre><p role="status" className={s.caption}>{copyStatus}</p></section>
      <section className={s.section}><h2>Keep your curiosity. Check the output.</h2><p>BERT can reflect biases in its training data and make confident mistakes. Its original input limit is 512 tokens, including special tokens. Long documents need a deliberate strategy rather than silently dropping useful context.</p><p>Raw BERT representations are not automatically ideal sentence-similarity embeddings. Use an appropriately trained model and evaluate it for your use case.</p></section>
    </div>}
    <section className={s.sources}><h2>Go to the source.</h2><a href="https://aclanthology.org/N19-1423/">The original BERT paper ↗</a><a href="https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf">Attention Is All You Need ↗</a><a href="https://huggingface.co/google-bert/bert-base-uncased">Model and model card ↗</a><details><summary>About these examples</summary><p>Attention and masked-token predictions were generated offline using eager attention and saved with the page. Source revision: <code>{data.revision}</code>. Bars show query-to-key attention, not embedding similarity or feature importance. The word-clue illustration is editorial.</p></details></section>
    <div className={s.closing}><span className={s.eyebrow}>A word gets more interesting in good company</span><h2>Change a sentence.<br/>See what shifts.</h2><Link href="/learn">← Back to all learning topics</Link></div>
  </div>;
}
