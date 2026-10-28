import type {Metadata} from 'next';
import {PageHead,CTA,Projects} from '@/components/shared';
import s from '@/components/site.module.css';

export const metadata:Metadata={title:'Portfolio Concepts' ,description:"Three illustrative explorations of useful digital experiences. These are concepts\u2014not completed client projects or evidence of delivered results."};
export default function Page(){return <><div className={s.wrap}><PageHead label={'The possibility board'} title={'A space for what could be.'}>Three illustrative explorations of useful digital experiences. These are concepts—not completed client projects or evidence of delivered results.</PageHead><div className={s.content}><Projects/><div className={s.notice} style={{marginTop:45}}>Each concept sets out a problem, a possible approach, and an evaluation plan. Real work will be added only with verified details and permission to publish.</div></div></div><CTA/></>}