/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useTransition } from 'react';
import useUser from '../../../hooks/user';

import UserContext from '../../../context/user';

import DisplayTodoByID from './displayToDoRouter';
import { getNestedToDo, getToDo } from '../../../services/firebase';
import ToDoEditToDo from '../actions/toDoMembers/toDo.editToDo';

import DeleteToDo from '../actions/deleteToDo';
import TitleEditToDo from '../actions/toDoMembers/title.editToDo';

import DisplayTodoByIDFalse from './actionSubCollection/displayToDoRouterFalse';
import DisplayTodoByIDTrue from './actionSubCollection/displayToDoRouterTrue';
import Loader from '../../../fallback/loader';
import LoaderTest from '../../../fallback/loaderTest';

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
  const [isPending, startTransition] = useTransition();

  const [checkIsDone, setCheckIsDone] = useState(true);
  const [checkIsNotDone, setCheckIsNotDone] = useState(true);
  const [filter, setFilter] = useState(true);

  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const [nestedArrayToDo, setNestedArrayToDo] = useState([]);
  const [arrayID, setArrayID] = useState([]);

  const isInvalidOne = checkIsDone === false;
  const isInvalidTwo = checkIsNotDone === false;

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
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID);
    } catch (error) {
      console.log(error);
    }
    getToDo(setToDoSArray);
  }, []);

  const pendingIsDone = (e) => {
    e.preventDefault();

    startTransition(() => {
      getNestedToDo(setNestedArrayToDo, setArrayID);
      getToDo(setToDoSArray);
      setCheckIsDone(!checkIsDone);
    });
  };

  const pendingIsNotDone = (e) => {
    e.preventDefault();

    startTransition(() => {
      getNestedToDo(setNestedArrayToDo, setArrayID);
      getToDo(setToDoSArray);
      setCheckIsNotDone(!checkIsNotDone);
    });
  };

  return (
    <div>
      {filter ? (
        <button
          type='button'
          id='dropdownDefault'
          onClick={() => setFilter(!filter)}
          className='inline-flex items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400'
        >
          Filter
        </button>
      ) : (
        <div
          className='inline-flex items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2'
          id='dropdown'
        >
          <button
            className=' items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400'
            onClick={() => {
              setFilter(!filter);
            }}
          >
            Cancel
          </button>
          <ul className='p-4' aria-labelledby='dropdownDefault'>
            <button
              disabled={isInvalidTwo}
              className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
                isInvalidTwo && 'opacity-50'
              }`}
              onClick={pendingIsDone}
            >
              Filter by done
            </button>
            <button
              disabled={isInvalidOne}
              className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
                isInvalidOne && 'opacity-50'
              }`}
              onClick={pendingIsNotDone}
            >
              Filter by NOT done
            </button>
          </ul>
        </div>
      )}{' '}
      {isPending && <LoaderTest />}
      {checkIsDone === false ? (
        <DisplayTodoByIDTrue
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
          nestedArrayToDo={nestedArrayToDo}
          setNestedArrayToDo={setNestedArrayToDo}
          arrayID={arrayID}
          setArrayID={setArrayID}
        />
      ) : checkIsNotDone === false ? (
        <DisplayTodoByIDFalse
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
          nestedArrayToDo={nestedArrayToDo}
          setNestedArrayToDo={setNestedArrayToDo}
          arrayID={arrayID}
          setArrayID={setArrayID}
        />
      ) : (
        <DisplayTodoByID
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
          nestedArrayToDo={nestedArrayToDo}
          setNestedArrayToDo={setNestedArrayToDo}
          arrayID={arrayID}
          setArrayID={setArrayID}
        />
      )}
    </div>
  );
}
ListOfDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
