import { useCallback } from 'react';
import firebase from 'firebase';

import { collectionName } from 'services/projectscore/constants';
import { User } from 'services/projectscore/models/user';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useUserAction: ProjectHooks['useUserAction'] = () => {
  const addUser = useCallback(async (user: User) => {
    try {
      const newUser = {
        ...user,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await db.collection(collectionName.users).doc(newUser.id).set(newUser);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // TODO: 動作確認
  const updateUser = useCallback(async (updatedUser: User) => {
    try {
      const newUser = {
        ...updatedUser,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await db.collection(collectionName.users).doc(newUser.id).set(newUser);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // TODO: 動作確認
  const deleteUser = useCallback(async (userId: string) => {
    await db.collection(collectionName.users).doc(userId).delete();
  }, []);

  return { addUser, updateUser, deleteUser };
};

export default useUserAction;
