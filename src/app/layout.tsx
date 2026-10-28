import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {Header} from '@/components/header';
import {Footer} from '@/components/shared';
import './globals.css';
const display=localFont({src:'../../design/phase-a/assets/BricolageGrotesque.ttf',variable:'--font-display',display:'swap',weight:'200 800'});
const body=localFont({src:'../../design/phase-a/assets/DMSans.ttf',variable:'--font-body',display:'swap',weight:'100 1000'});
export const metadata:Metadata={title:{default:'Veqo — Ideas in full color',template:'%s | Veqo'},description:'Guided student projects and thoughtful SaaS development. Turn your next idea into something real with Veqo.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${display.variable} ${body.variable}`}><body><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
