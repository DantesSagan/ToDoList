/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../../../hooks/user';

import UserContext from '../../../../context/user';

import { getNestedToDo, getToDo } from '../../../../services/firebase';

import { DisplayTodoByIDNESTED } from './sub.displayToDoNested';
import EditSubToDo from './actions/sub.editSubToDo';
import DeleteSubToDo from './actions/sub.deleteSubToDo';
import Skeleton from '@material-ui/lab/Skeleton';
import FlagsSub from './actions/flags';

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

  const colorsArray = ['red', 'green', 'gray', 'white'];
  const [flags, setFlags] = useState(colorsArray);
  const [colors, setColors] = useState('');

  const nestedToDoArray = nestedArrayToDo;

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

  const { handleSubFlags } = FlagsSub({
    firebaseLib,
    nestedToDoArray,
    colors,
    setNestedArrayToDo,
    setArrayID,
  });

  const skeletonArray = Array(1).fill('');

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
        setArrayID={setArrayID}
        handleSubFlags={handleSubFlags}
        flags={flags}
        setFlags={setFlags}
        colors={colors}
        setColors={setColors}
        nestedToDoArray={nestedToDoArray}
      />
    </div>
  );
}
ListOfSubDisplayToDo.propTypes = {
  toDosArray: PropTypes.object.isRequired,
};
