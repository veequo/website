'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useRef,useState} from 'react';
import {Wordmark} from './brand';
import s from './site.module.css';
export function Header(){const [open,setOpen]=useState(false);const trigger=useRef<HTMLButtonElement>(null);const path=usePathname();return <header className={s.header} onKeyDown={e=>{if(e.key==='Escape'&&open){setOpen(false);trigger.current?.focus()}}}><div className={`${s.wrap} ${s.nav}`}><Link className={s.logo} href="/" aria-label="Veqo home" onClick={()=>setOpen(false)}><Wordmark/></Link><button ref={trigger} className={s.menu} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{open?'Close ×':'Menu ☰'}</button><nav id="main-nav" aria-label="Main navigation" className={s.links} data-open={open}>{[['Student Projects','/student-projects'],['SaaS Development','/saas-development'],['Our approach','/process'],['About','/about']].map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/contact" className={s.button} onClick={()=>setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link></nav></div></header>}
