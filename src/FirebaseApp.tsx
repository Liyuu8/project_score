import React, { FC, useEffect, useRef, useState } from 'react';
import firebase from 'firebase';

import { ProjectHooksContext } from 'hooks/project';
import usePubProjects from 'hooks/project/firestore/use-pub-projects';
import useMyProjects from 'hooks/project/firestore/use-my-projects';
import useProject from 'hooks/project/firestore/use-project';
import useProjectAction from 'hooks/project/firestore/use-project-action';
import useProjectScoreAction from 'hooks/project/firestore/use-project-score-action';
import useScores from 'hooks/project/firestore/use-scores';
import useScoreAction from 'hooks/project/firestore/use-score-action';
import useScoreDataAction from 'hooks/project/firestore/use-score-data-action';
import useMemos from 'hooks/project/firestore/use-memos';
import useMemoAction from 'hooks/project/firestore/use-memo-action';
import usePlots from 'hooks/project/firestore/use-plots';
import usePlotAction from 'hooks/project/firestore/use-plot-action';
import useNotes from 'hooks/project/firestore/use-notes';
import useNoteAction from 'hooks/project/firestore/use-note-action';
import useConnections from 'hooks/project/firestore/use-connections';
import useConnectionAction from 'hooks/project/firestore/use-connection-action';
import useFindings from 'hooks/project/firestore/use-findings';
import useFindingAction from 'hooks/project/firestore/use-finding-action';
import useUser from 'hooks/project/firestore/use-user';
import useUserAction from 'hooks/project/firestore/use-user-action';
import { ProjectContext, UserContext } from 'contexts';
import { blankUser } from 'services/projectscore/models/user';
import { auth } from 'utils/firebase';

const FirebaseApp: FC = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [
    credential,
    setCredential,
  ] = useState<firebase.auth.UserCredential | null>(null);
  const authCounterRef = useRef(0);
  const { addUser } = useUserAction();

  const [isPublicProject, setIsPublicProject] = useState(false);

  const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
    if (!firebaseUser) {
      setUserId('');
      setAuthLoading(false);

      return;
    }

    if (authCounterRef.current === 1 && credential) {
      const newUser = {
        ...blankUser,
        id: firebaseUser.uid,
        inAppUserId: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        inAppUserName: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
        photoUrl: firebaseUser.photoURL,
      };

      await addUser(newUser);
      setUserId(newUser.id);
    } else if (!userId) {
      setUserId(firebaseUser.uid);
    }
    setAuthLoading(false);
  });

  useEffect(() => {
    if (credential) authCounterRef.current += 1;

    return unsubscribe;
    // don't suppress trigger with using deps to enable counter
  });

  return (
    <ProjectHooksContext.Provider
      value={{
        usePubProjects,
        useMyProjects,
        useProject,
        useProjectAction,
        useProjectScoreAction,
        useScores,
        useScoreAction,
        useScoreDataAction,
        useMemos,
        useMemoAction,
        usePlots,
        usePlotAction,
        useNotes,
        useNoteAction,
        useConnections,
        useConnectionAction,
        useFindings,
        useFindingAction,
        useUser,
        useUserAction,
      }}
    >
      <UserContext.Provider
        value={{
          userId,
          authLoading,
          setAuthLoading,
          credential,
          setCredential,
        }}
      >
        <ProjectContext.Provider
          value={{ isPublicProject, setIsPublicProject }}
        >
          {children}
        </ProjectContext.Provider>
      </UserContext.Provider>
    </ProjectHooksContext.Provider>
  );
};

export default FirebaseApp;

// [REF]
// https://github.com/oukayuka/ReactFirebaseBook/blob/master/06-auth/mangarel-demo/src/FirebaseApp.tsx
// https://github.com/yamitzky/react-firebase-hooks-injection/blob/master/src/App.tsx
