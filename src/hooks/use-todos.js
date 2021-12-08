/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getToDo } from '../services/firebase';

export default function useToDo(user) {
  const [toDoS, setToDoS] = useState(null);

  useEffect(() => {
    async function getTimeLineToDos() {
      if (user?.toDoList?.length > 0) {
        const usersToDo = await getToDo(user.userId, user.toDoList);
        usersToDo.sort((a, b) => b.dateCreated - a.dateCreated);
        setToDoS(usersToDo);
      }
    }
    getTimeLineToDos();
  }, [user?.userId]);

  return { toDoS };
}
