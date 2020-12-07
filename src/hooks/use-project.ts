import { useContext, useEffect, useRef, useState } from 'react';

import { Project } from 'services/projectscore/models/project';
import { collectionName } from 'services/projectscore/constants';
import { FirebaseContext } from 'contexts';
import { Score } from 'services/projectscore/models/score';
import { Finding } from 'services/projectscore/models/finding';
import { Note } from 'services/projectscore/models/note';
import { NoteConnection } from 'services/projectscore/models/connection';

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProject = (projectId: string) => {
  const [projectScore, setProjectScore] = useState<ProjectScore>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');

    const load = async () => {
      setLoading(true);
      try {
        const projectDoc = db
          .collection(collectionName.projects)
          .doc(projectId);

        const project = (await projectDoc.get()).data() as Project;
        let scoreDataList: ScoreData[] = [];
        await Promise.all(
          await projectDoc
            .collection(collectionName.scores)
            .get()
            .then((scoreQuerySnapshot) =>
              scoreQuerySnapshot.docs.map(async (scoreDocSnapshot) => {
                let noteDataList: NoteData[] = [];
                await Promise.all(
                  await scoreDocSnapshot.ref
                    .collection(collectionName.notes)
                    .get()
                    .then((noteQuerySnapshot) =>
                      noteQuerySnapshot.docs.map(async (noteDocSnapshot) => ({
                        note: noteDocSnapshot.data() as Note,
                        findings: await noteDocSnapshot.ref
                          .collection(collectionName.findings)
                          .get()
                          .then((findingQuerySnapshot) =>
                            findingQuerySnapshot.docs.map(
                              (findingDocSnapshot) =>
                                findingDocSnapshot.data() as Finding
                            )
                          ),
                      }))
                    )
                ).then((promisedNoteDataList) => {
                  noteDataList = promisedNoteDataList;
                });

                return {
                  score: scoreDocSnapshot.data() as Score,
                  noteDataList,
                  noteConnections: await scoreDocSnapshot.ref
                    .collection(collectionName.connections)
                    .get()
                    .then((collectionDocSnapshot) =>
                      collectionDocSnapshot.docs.map(
                        (snapshot) => snapshot.data() as NoteConnection
                      )
                    ),
                };
              })
            )
        ).then((promisedScoreDataList) => {
          scoreDataList = promisedScoreDataList;
        });

        setProjectScore({ project, scoreDataList });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, [projectId]);

  return { projectScore, loading, error };
};

export default useProject;
