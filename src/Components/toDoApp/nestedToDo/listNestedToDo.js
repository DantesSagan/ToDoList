/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../../hooks/user';

import UserContext from '../../../context/user';

import { getToDo } from '../../../services/firebase';
import ToDoEditToDo from '../actions/toDoMembers/toDo.editToDo';

import DeleteToDo from '../actions/deleteToDo';
import TitleEditToDo from '../actions/toDoMembers/title.editToDo';
import { DisplayTodoByIDNESTED } from './displayToDoNested';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ListOfNestedDisplayToDo({
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

  const [loading, setLoading] = useState(true);

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
    setTimeout(() => {
      getToDo(setToDoSArray).then((doc) => {
        setLoading(!loading);
      });
    }, 500);
  }, []);

  const skeletonArray = Array(1).fill('');

  return (
    <div className='h-screen'>
      {loading ? (
        <>
          {skeletonArray.map((fall) => {
            return (
              <Skeleton
                animation='wave'
                variant='rect'
                height={250}
                width={600}
                className='rounded-lg mb-2'
                key={fall.id}
              >
                {fall}
              </Skeleton>
            );
          })}
        </>
      ) : (
        <div>
          <DisplayTodoByIDNESTED
            toDosArray={toDosArray}
            user={user}
            deleteToDo={deleteToDo}
            title={title}
            setTitle={setTitle}
            toDo={toDo}
            setToDo={setToDo}
            editToDoList={editToDoList}
            editTitle={editTitle}
            setToDoSArray={setToDoSArray}
          />
        </div>
      )}
    </div>
  );
}
ListOfNestedDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
