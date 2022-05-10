/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../hooks/user';

import UserContext from '../../context/user';

import RouterToDo from './list.routerToDo';
import { DoneToDoByFalse, DoneToDoByTrue } from '../../services/firebase-sort';
import { getToDo } from '../../services/firebase';

export default function ListOfToDo({
  toDosArray,
  title,
  toDoID,
  setToDoSArray,
}) {
  const [checkIsDone, setCheckIsDone] = useState(true);
  const [checkIsNotDone, setCheckIsNotDone] = useState(true);
  const [filter, setFilter] = useState(true);

  const [loading, setLoading] = useState(true);

  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const isInvalidOne = checkIsDone === false;
  const isInvalidTwo = checkIsNotDone === false;

  useEffect(() => {
    getToDo(setToDoSArray).then((data) => {
      setLoading(false);
    });
  }, []);

  const pendingTrue = (e) => {
    e.preventDefault();

    DoneToDoByTrue(setToDoSArray).then((data) => {
      setLoading(false);
    });
    setCheckIsDone(!checkIsDone);
  };

  const pendingFalse = (e) => {
    e.preventDefault();

    setCheckIsNotDone(!checkIsNotDone);
    DoneToDoByFalse(setToDoSArray).then((data) => {
      setLoading(false);
    });
  };

  const pendingDefault = (e) => {
    e.preventDefault();
    setCheckIsNotDone(true);
    setCheckIsDone(true);
    getToDo(setToDoSArray).then((data) => {
      setLoading(false);
    });
  };

  return (
    <section>
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
          className='grid grid-rows-1 grid-flow-col gap-4 items-center p-2 bg-blue-600 text-bold  rounded-lg text-white m-2'
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
          <button
            disabled={isInvalidTwo}
            className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
              isInvalidTwo && 'opacity-50'
            }`}
            onClick={pendingTrue}
          >
            Filter by done
          </button>
          <button
            disabled={isInvalidOne}
            className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
              isInvalidOne && 'opacity-50'
            }`}
            onClick={pendingFalse}
          >
            Filter by NOT done
          </button>
          <button
            disabled={isInvalidOne}
            className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
              isInvalidOne && 'opacity-50'
            }`}
            onClick={pendingDefault}
          >
            Default
          </button>
        </div>
      )}

      <RouterToDo
        toDoID={toDoID}
        title={title}
        toDosArray={toDosArray}
        user={user}
        setToDoSArray={setToDoSArray}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
}
