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
    title: 'How object detection works',
    category: 'Computer vision',
    description: 'How does a computer find a person, a bus, or a cup in a picture? Follow an image through YOLO, then try the model yourself.',
    href: '/model-explorer',
    model: 'YOLO11n',
    outcomes: ['Follow the journey from pixels to predictions', 'Try detection on a sample or your own image', 'Explore confidence scores and what models miss'],
  },
];
