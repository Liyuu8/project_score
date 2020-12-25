import firebase from 'firebase';

export type Note = {
  id: string;
  content: string;
  type: keyof typeof noteElements;
  posX: number;
  posY: number;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankNote: Note = {
  id: '',
  content: '',
  type: 'measure',
  posX: 0,
  posY: 0,
  createdAt: null,
  updatedAt: null,
};

export const initialNoteElementList = [
  {
    type: 'measure',
    posX: 50,
    posY: 25,
  },
  {
    type: 'measure',
    posX: 50,
    posY: 250,
  },
  {
    type: 'intermediateObjective',
    posX: 450,
    posY: 25,
  },
  {
    type: 'victoryCondition',
    posX: 850,
    posY: 25,
  },
  {
    type: 'acquisitionGoal',
    posX: 850,
    posY: 340,
  },
];

export const noteElements = {
  measure: {
    name: '施策',
    hasTarget: false,
    hasSourse: true,
    posX: 50,
    posY: 250,
  },
  intermediateObjective: {
    name: '中間目標',
    hasTarget: true,
    hasSourse: true,
    posX: 450,
    posY: 250,
  },
  victoryCondition: {
    name: '勝利条件',
    hasTarget: true,
    hasSourse: false,
    posX: 850,
    posY: 250,
  },
  acquisitionGoal: {
    name: '獲得目標',
    hasTarget: false,
    hasSourse: false,
    posX: null,
    posY: null,
  },
  finding: {
    name: '得られた知見',
    hasTarget: false,
    hasSourse: false,
    posX: null,
    posY: null,
  },
} as const;
