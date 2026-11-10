/** Add published topics here to grow the learning homepage. */
export type LearningTopic = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href: string;
  model: string;
  outcomes: string[];
  illustration: 'detection' | 'language';
};

export const learningTopics: LearningTopic[] = [
  {
    slug: 'object-detection',
    illustration: 'detection',
    title: 'How YOLO object detection works',
    category: 'Computer vision',
    description: 'Follow an image through YOLO: preparation, predictions, filtering, and inference. Then try the model on a sample or your own image.',
    href: '/model-explorer',
    model: 'YOLO11n',
    outcomes: ['Understand the steps from pixels to predictions', 'Try detection on a sample or your own image', 'Inspect confidence scores and model limitations'],
  },
  {
    slug: 'bert',
    illustration: 'language',
    title: 'How BERT reads context',
    category: 'Natural language processing',
    description: 'Same word, different meaning. Discover how BERT uses surrounding words and multiple attention heads to build context.',
    href: '/learn/bert',
    model: 'BERT Base',
    outcomes: ['See how surrounding words change context', 'Compare real attention across heads and layers', 'Explore masked-token predictions and try a quiz'],
  },
];
