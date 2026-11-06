import type {Metadata} from 'next';
import Explorer from './explorer';
export const metadata: Metadata = {title: 'Model explorer — Learn by looking', description: 'Explore YOLO11n, detect objects in your own images, and discover how a model sees.'};
export default function Page() {return <Explorer/>;}
