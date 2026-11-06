import type {Metadata} from 'next';
import Link from 'next/link';
import {Button} from '@/components/shared';
import {learningTopics} from '@/content/learning';
import s from '@/components/site.module.css';
import l from './learn.module.css';

export const metadata: Metadata = {
  title: 'Learn — Technology, made understandable',
  description: 'Learn how technology works through visual explanations and hands-on experiments. Start with object detection and explore YOLO.',
};

export default function LearnPage() {
  return <div className={s.wrap}>
    <section className={l.hero}>
      <div>
        <span className={s.eyebrow}>Veqotech / Learn</span>
        <h1>A little curiosity.<br/>A new way to <em>see.</em></h1>
        <p>Get to know the technology behind the things you use. Visual explanations, small experiments, and those “now I get it” moments.</p>
        <div className={s.actions}><Button href={learningTopics[0].href}>Explore object detection</Button><a className={l.browse} href="#topics">Browse topics ↓</a></div>
      </div>
      <div className={l.note}>
        <span className={l.symbol} aria-hidden="true">✳</span>
        <p>Big ideas.<br/>Small discoveries.</p>
        <span>Understand it. Try it. Make it your own.</span>
      </div>
    </section>
    <section id="topics" className={l.topics} aria-labelledby="topics-title">
      <div className={s.sectionTop}>
        <div><span className={s.eyebrow}>Follow your curiosity</span><h2 id="topics-title">Something new starts here.</h2></div>
        <p>{learningTopics.length === 1 ? 'Our first topic is ready to explore. This library will grow, one useful explanation at a time.' : `${learningTopics.length} topics to explore. Pick a question and start discovering.`}</p>
      </div>
      <div className={l.catalog}>
        {learningTopics.map((topic, index) => <article key={topic.slug} className={l.topic}>
          <div className={l.visual}>
            <div className={l.visualLabel}><span>{topic.category}</span><span>0{index + 1}</span></div>
            <svg viewBox="0 0 480 300" role="img" aria-label="Concept illustration: a cup located inside a detection box">
              <ellipse cx="240" cy="255" rx="140" ry="17" fill="#56316d" opacity=".1"/>
              <path d="M163 108h130l-14 130q-50 20-102 0z" fill="#f3c64d" stroke="#56316d" strokeWidth="4"/>
              <path d="M293 128q77-12 57 51q-10 28-62 22" fill="none" stroke="#56316d" strokeWidth="10"/>
              <path d="M202 90q-22-22 0-44m43 44q-22-22 0-44" fill="none" stroke="#56316d" strokeWidth="3" strokeLinecap="round"/>
              <rect x="140" y="95" width="225" height="168" rx="8" stroke="#56316d" strokeWidth="2" strokeDasharray="7 5" fill="none"/>
              <rect x="140" y="66" width="70" height="29" rx="5" fill="#56316d"/><text x="158" y="86" fill="#fff8ed" fontSize="17" fontFamily="monospace">cup</text>
            </svg>
            <small>Concept illustration · a box tells us where to look</small>
          </div>
          <div className={l.topicBody}>
            <div className={l.meta}><span>Interactive guide</span><span>Beginner friendly</span></div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <ul>{topic.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
            <div className={l.topicFooter}><Button href={topic.href}>Start exploring</Button><span>Featuring {topic.model}</span></div>
          </div>
        </article>)}
      </div>
    </section>
    <section className={l.bottom} aria-labelledby="studio-title">
      <div><span className={s.eyebrow}>From the people who build</span><h2 id="studio-title">We build software.<br/>And share how it works.</h2></div>
      <div><p>Veqotech brings ideas to life through software development. This is our space to make technology easier to understand, with more topics to explore as we grow.</p><Link href="/saas-development">Explore our development services ↗</Link></div>
    </section>
  </div>;
}
