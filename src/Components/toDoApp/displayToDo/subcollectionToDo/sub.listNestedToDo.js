/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../../../hooks/user';

import UserContext from '../../../../context/user';

import { getNestedToDo, getToDo } from '../../../../services/firebase';

import { DisplayTodoByIDNESTED } from './sub.displayToDoNested';
import EditSubToDo from './actions/sub.editSubToDo';
import DeleteSubToDo from './actions/sub.deleteSubToDo';

export default function ListOfSubDisplayToDo({
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

  const [nestedArrayToDo, setNestedArrayToDo] = useState([]);
  const [arrayID, setArrayID] = useState([]);

  const { deleteSubToDo } = DeleteSubToDo({
    setNestedArrayToDo,
    arrayID,
    setArrayID,
    nestedArrayToDo,
  });

  const { editSubToDo } = EditSubToDo({
    setToDoSArray,
    toDosArray,
    displayName,
    toDo,
    createdAt,
    toDoID,
    setToDo,
    firebaseLib,
    setNestedArrayToDo,
    arrayID,
    setArrayID,
    nestedArrayToDo,
  });

  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID);
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
    getToDo(setToDoSArray);
  }, []);

  return (
    <div className='h-screen'>
      <DisplayTodoByIDNESTED
        toDosArray={toDosArray}
        user={user}
        deleteSubToDo={deleteSubToDo}
        title={title}
        setTitle={setTitle}
        toDo={toDo}
        setToDo={setToDo}
        editSubToDo={editSubToDo}
        setToDoSArray={setToDoSArray}
        nestedArrayToDo={nestedArrayToDo}
        setNestedArrayToDo={setNestedArrayToDo}
        arrayID={arrayID}
      />
    </div>
  );
}
ListOfSubDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
