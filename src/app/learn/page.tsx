import type {Metadata} from 'next';
import Link from 'next/link';
import {Button} from '@/components/shared';
import {learningTopics} from '@/content/learning';
import s from '@/components/site.module.css';
import l from './learn.module.css';

export const metadata: Metadata = {
  title: 'Learn — Practical guides to how technology works',
  description: 'Explore object detection with YOLO and language context with BERT through practical, interactive guides.',
};

export default function LearnPage() {

  return <div className={s.wrap}>
    <section className={l.hero} aria-labelledby="learn-title">
      <span className={s.eyebrow}>Veqotech / Learn</span>
      <h1 id="learn-title">Understand how the technology works.</h1>
      <p>Clear explanations, hands-on examples, and practical implementation notes. Explore object detection with YOLO or discover how BERT builds language context.</p>
    </section>

    {learningTopics.map((topic, index) => <section key={topic.slug} className={l.topic} aria-labelledby={`${topic.slug}-title`}>
      <div className={l.topicIntro}>
        <span className={l.topicNumber}>{String(index + 1).padStart(2, '0')} / {topic.category.toUpperCase()}</span>
        <h2 id={`${topic.slug}-title`}>{topic.title}</h2>
        <p>{topic.description}</p>
        <Button href={topic.href}>Explore {topic.model}</Button>
      </div>
      {topic.slug === 'bert' ? <ol className={l.path}>{topic.outcomes.map((outcome, i) => <li key={outcome}><span>0{i + 1}</span><div><h3>{['Understand context', 'Compare attention heads', 'Try it and build'][i]}</h3><p>{outcome}</p></div></li>)}</ol> : <ol className={l.path}>
        <li><span>01</span><div><h3>Understand the idea</h3><p>See how an image becomes model predictions, and what those predictions can and cannot tell you.</p></div></li>
        <li><span>02</span><div><h3>Try it yourself</h3><p>Run YOLO on a sample or your own image, then see how changing the confidence threshold affects what appears.</p></div></li>
        <li><span>03</span><div><h3>Look at inference</h3><p>Review the Python example and the main steps behind preparing an image, predicting, filtering, and reading results.</p></div></li>
      </ol>}
    </section>)}

    <section className={l.next} aria-label="More learning topics">
      <p>More guides will be added as we build and learn.</p>
      <Link href="/contact">Have a topic in mind? Tell us ↗</Link>
    </section>
  </div>;
}
