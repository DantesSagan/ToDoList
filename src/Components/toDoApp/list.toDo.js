/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import useUser from '../../hooks/user';

import UserContext from '../../context/user';

// import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
// import { updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
// import { DisplayTodoByUser } from './displayToDo/displayToDo';
// import { getAuth } from 'firebase/auth';
import RouterToDo from './list.routerToDo';
import RouterToDoTrue from './actions/filter/list.routerToDoTrue';
import RouterToDoFalse from './actions/filter/list.routerToDoFalse';
import { useNavigate } from 'react-router-dom';

export default function ListOfToDo({
  toDosArray,
  title,
  toDoID,
  setToDoSArray,
}) {
  const [checkIsDone, setCheckIsDone] = useState(true);
  const [checkIsNotDone, setCheckIsNotDone] = useState(true);
  const [filter, setFilter] = useState(true);
  
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const isInvalidOne = checkIsDone === false
  const isInvalidTwo = checkIsNotDone === false;
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
              onClick={() => setCheckIsDone(!checkIsDone)}
            >
              Filter by done
            </button>
            <button
              disabled={isInvalidOne}
              className={`block p-2 bg-blue-600 text-bold  rounded-lg text-white m-2 hover:bg-blue-400 ${
                isInvalidOne && 'opacity-50'
              }`}
              onClick={() => setCheckIsNotDone(!checkIsNotDone)}
            >
              Filter by NOT done
            </button>
          </ul>
        </div>
      )}

      {checkIsDone === false ? (
        <RouterToDoTrue
          toDoID={toDoID}
          title={title}
          toDosArray={toDosArray}
          user={user}
          setToDoSArray={setToDoSArray}
        />
      ) : checkIsNotDone === false ? (
        <RouterToDoFalse
          toDoID={toDoID}
          title={title}
          toDosArray={toDosArray}
          user={user}
          setToDoSArray={setToDoSArray}
        />
      ) : (
        <RouterToDo
          toDoID={toDoID}
          title={title}
          toDosArray={toDosArray}
          user={user}
          setToDoSArray={setToDoSArray}
        />
      )}
    </section>
  );
}
ListOfToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
