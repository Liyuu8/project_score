import firebase from 'firebase';

export type Score = {
  id: string;
  title: string;
  stage: number; // ステージ項番
  member: string; // 人材
  budget: string; // 予算
  leadTime: string; // 納期／リードタイム
  quality: string; // クオリティ
  businessModel: string; // ビジネスモデル
  surroundings: string; // 環境
  competitor: string; // 競合
  enemy: string; // 外敵
  memo: string; // メモ
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankScore: Score = {
  id: '',
  title: 'Stage 1',
  stage: 1,
  member: '',
  budget: '',
  leadTime: '',
  quality: '',
  businessModel: '',
  surroundings: '',
  competitor: '',
  enemy: '',
  memo: '',
  createdAt: null,
  updatedAt: null,
};
