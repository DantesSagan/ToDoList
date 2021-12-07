/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getToDo } from '../services/firebase';

export default function useToDo(user) {
  const [toDoS, setToDoS] = useState(null);

  useEffect(() => {
    async function getTimeLinePhotos() {
      if (user?.toDoS?.length > 0) {
        const usersToDo = await getToDo(user.userId, user.toDosAdditional);
         usersToDo.sort((a, b) => b.dateCreated - a.dateCreated);
        setToDoS(usersToDo);
      }
    }
    getTimeLinePhotos();
  }, [user?.userId]);

  return { toDoS };
}
