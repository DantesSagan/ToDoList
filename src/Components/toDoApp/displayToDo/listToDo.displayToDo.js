/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useTransition } from 'react';
import useUser from '../../../hooks/user';
import Skeleton from '@material-ui/lab/Skeleton';

import UserContext from '../../../context/user';

import DisplayTodoByID from './displayToDoRouter';
import { getNestedToDo, getToDo } from '../../../services/firebase';
import ToDoEditToDo from '../actions/toDoMembers/toDo.editToDo';

import DeleteToDo from '../actions/deleteToDo';
import TitleEditToDo from '../actions/toDoMembers/title.editToDo';

import Loader from '../../../fallback/loader';
import LoaderTest from '../../../fallback/loaderTest';
import {
  DoneSubToDoByFalse,
  DoneSubToDoByTrue,
} from '../../../services/firebase-sort';

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

  const [loading, setLoading] = useState(true);
  const [loadingNested, setLoadingNested] = useState(true);

  const [loadingTrue, setLoadingTrue] = useState(true);

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
      getNestedToDo(setNestedArrayToDo, setArrayID).then(() =>
        setLoadingNested(false)
      );
      getToDo(setToDoSArray).then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const pendingIsDone = (e) => {
    e.preventDefault();

    setFilter(true);
    setLoadingNested(true);
    DoneSubToDoByTrue(setNestedArrayToDo, setArrayID).then(() => {
      setLoadingNested(false);
    });
    getToDo(setToDoSArray).then(() => setLoading(false));
    setCheckIsDone(!checkIsDone);
  };

  const pendingIsNotDone = (e) => {
    e.preventDefault();

    setFilter(true);
    setLoadingNested(true);
    DoneSubToDoByFalse(setNestedArrayToDo, setArrayID).then(() =>
      setLoadingNested(false)
    );
    setLoading(true);
    getToDo(setToDoSArray).then(() => setLoading(false));
    setCheckIsNotDone(!checkIsNotDone);
  };

  const pendingDefault = (e) => {
    e.preventDefault();

    setFilter(true);
    setLoadingNested(true);
    getNestedToDo(setNestedArrayToDo, setArrayID).then(() =>
      setLoadingNested(false)
    );
    setLoading(true);
    getToDo(setToDoSArray).then(() => setLoading(false));
    setCheckIsDone(true);
    setCheckIsNotDone(true);
  };

  const skeletonArray = Array(8).fill('');

  return (
    <div>
      {filter ? (
        <button
          type='button'
          id='dropdownDefault'
          onClick={() => {
            setFilter(!filter);
          }}
          className='inline-flex items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400'
        >
          Filter
        </button>
      ) : (
        <div
          className='grid grid-rows-1 grid-flow-col gap-4 items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2'
          id='dropdown'
        >
          <button
            className=' items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400'
            onClick={() => {
              setCheckIsDone(true);
              setCheckIsNotDone(true);
              setFilter(!filter);
            }}
          >
            Cancel
          </button>
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
          <button
            className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
              isInvalidOne && 'opacity-50'
            }`}
            onClick={pendingDefault}
          >
            Default
          </button>
        </div>
      )}{' '}
      {loading && loadingNested ? (
        <>
          {skeletonArray.map((fall) => {
            return (
              <Skeleton
                animation='wave'
                variant='rectangular'
                height={200}
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
            loading={loading}
            loadingNested={loadingNested}
            setLoadingNested
          />
        </div>
      )}
    </div>
  );
}
ListOfDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
