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

  const [loading, setLoading] = useState(true);

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
      getNestedToDo(setNestedArrayToDo, setArrayID).then((doc) => {
        setLoading(false);
      });
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
    getToDo(setToDoSArray);
  }, []);

  const skeletonArray = Array(1).fill('');

  return (
    <div className='h-screen'>
      {loading ? (
        <>
          {skeletonArray.map((fall) => {
            return (
              <Skeleton
                sx={{ bgcolor: 'red.900' }}
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
          loading={loading}
        />
      )}
    </div>
  );
}
ListOfSubDisplayToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
