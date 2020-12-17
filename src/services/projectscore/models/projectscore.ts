import { NoteConnection } from './connection';
import { Finding } from './finding';
import { Note } from './note';
import { Project } from './project';
import { Score } from './score';

export interface ProjectScore {
  project: Project;
  scoreDataList: ScoreData[];
}

export interface ScoreData {
  score: Score;
  noteDataList: NoteData[];
  noteConnections: NoteConnection[];
}

export interface NoteData {
  note: Note;
  findings: Finding[];
}
