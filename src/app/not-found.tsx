import {Button} from '@/components/shared';
import s from '@/components/site.module.css';
export default function NotFound(){return <div className={`${s.wrap} ${s.empty}`}><span className={s.eyebrow}>404 / A small detour</span><h1>This idea hasn’t<br/>taken shape here.</h1><p>That page doesn’t exist. Let’s get you back to a useful starting point.</p><Button href="/">Back to home</Button></div>}
