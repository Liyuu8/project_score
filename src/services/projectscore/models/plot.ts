import firebase from 'firebase';

export type Plot = {
  id: string;
  content: string;
  index: number | null;
  type: keyof typeof plotElements | null;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankPlot: Plot = {
  id: '',
  content: '',
  index: null,
  type: null,
  createdAt: null,
  updatedAt: null,
};

export const plotElements = {
  member: { name: '人材' },
  budget: { name: '予算' },
  leadTime: { name: '納期／リードタイム' },
  quality: { name: 'クオリティ' },
  businessModel: { name: 'ビジネスモデル' },
  surroundings: { name: '環境' },
  competitor: { name: '競合' },
  enemy: { name: '外敵' },
} as const;

export const plotTypeList: (keyof typeof plotElements)[] = [
  'member',
  'budget',
  'leadTime',
  'quality',
  'businessModel',
  'surroundings',
  'competitor',
  'enemy',
];
