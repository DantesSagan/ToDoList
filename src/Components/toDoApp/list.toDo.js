/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useUser from '../../hooks/user';

import UserContext from '../../context/user';

// import { firebaseLib } from '../../firebaseLibrary/firebaseLib';
// import { updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
// import { DisplayTodoByUser } from './displayToDo/displayToDo';
// import { getAuth } from 'firebase/auth';
import RouterToDo from './list.routerToDo';

export default function ListOfToDo({
  toDosArray,
  title,
  toDoID,
  setToDoSArray,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  return (
    <div>
      <RouterToDo
        toDoID={toDoID}
        title={title}
        toDosArray={toDosArray}
        user={user}
        setToDoSArray={setToDoSArray}
      />
    </div>
  );
}
ListOfToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
