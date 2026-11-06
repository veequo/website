/** Add published topics here to grow the learning homepage. */
export type LearningTopic = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href: string;
  model: string;
  outcomes: string[];
};

export const learningTopics: LearningTopic[] = [
  {
    slug: 'object-detection',
    title: 'How YOLO object detection works',
    category: 'Computer vision',
    description: 'Follow an image through YOLO: preparation, predictions, filtering, and inference. Then try the model on a sample or your own image.',
    href: '/model-explorer',
    model: 'YOLO11n',
    outcomes: ['Understand the steps from pixels to predictions', 'Try detection on a sample or your own image', 'Inspect confidence scores and model limitations'],
  },
];
