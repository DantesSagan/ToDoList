/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import useUser from '../../../hooks/user';

import UserContext from '../../../context/user';

import { updateDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { DisplayTodoByID } from './displayToDoRouter';
import { getToDo } from '../../../services/firebase';
import ToDoEditToDo from '../actions/toDoMembers/toDo.editToDo';

import DeleteToDo from '../actions/deleteToDo';
import TitleEditToDo from '../actions/toDoMembers/title.editToDo';
import Checking from '../actions/checkUserTodo';

export default function ListOfDisplayToDo({
  title,
  setTitle,
  displayName,
  createdAt,
  toDoID,
  toDo,
  setToDo,
  toDosArray,
  setToDoSArray,
  firebaseLib,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const { deleteToDo } = DeleteToDo();
  const { editToDoList } = ToDoEditToDo({
    setToDoSArray,
    toDosArray,
    displayName,
    toDo,
    createdAt,
    toDoID,
    setToDo,
    firebaseLib,
  });
  const { editTitle } = TitleEditToDo({
    displayName,
    createdAt,
    toDoID,
    toDosArray,
    setToDoSArray,
    firebaseLib,
    title,
    setTitle,
  });
  // const { comparison } = Checking({ user });
  // console.log(comparison);
  useEffect(() => {
    getToDo(setToDoSArray);
  }, []);

  return (
    <div>
      <DisplayTodoByID
        toDosArray={toDosArray}
        user={user}
        deleteToDo={deleteToDo}
        title={title}
        setTitle={setTitle}
        toDo={toDo}
        setToDo={setToDo}
        // editToDo={editToDo}
        editToDoList={editToDoList}
        editTitle={editTitle}
      />
    </div>
  );
}
ListOfDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
