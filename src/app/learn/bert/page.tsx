import type {Metadata} from 'next';
import BertLesson from './lesson';
export const metadata: Metadata = {
  title: 'How BERT reads context — Learn',
  description: 'Explore how BERT builds context, compare real attention heads, and see how surrounding words change masked-token predictions.',
};
export default function Page() { return <BertLesson/>; }
