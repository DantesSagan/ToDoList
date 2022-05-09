/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { getNestedToDo } from '../../../services/firebase';
import NestedSubObj from './displayToDoMembers/nestedSubObj';
import NestMainToDo from './displayToDoMembers/nestMainToDo';

export default function DisplayTodoByID({
  toDosArray,
  user,
  nestedArrayToDo,
  setNestedArrayToDo,
  arrayID,
  setArrayID,
}) {
  // const [clickTitle, setClickTitle] = useState(false);
  // const [clickToDo, setClickToDo] = useState(false);

  const [loading, setLoading] = useState(true);

  const disNameArray = toDosArray;

  const nestedToDoArray = nestedArrayToDo;

  // Problem was in nested scope object function
  // And getNestedToDo doesn't invoke nestedToDo
  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID).then(() =>
        setLoading(false)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(new Date());

  const skeletonArray = Array(1).fill('');
  const skeletonArrayNest = Array(8).fill('');

  // For now subcollection will calling only with console.log???
  // And again it's displaying nested subcollection when was call
  // Need to fix that and reveal it on permanent display like parent toDoArray and forchild too === done
  return (
    <form className='border-l-4  border-red-600 rounded-xl  hover:border-l-black borderHover transition duration-300'>
      {' '}
      {loading ? (
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
        <NestMainToDo disNameArray={disNameArray} user={user} />
      )}{' '}
      {loading ? (
        <>
          {skeletonArrayNest.map((fall) => {
            return (
              <Skeleton
                animation='wave'
                variant='rectangular'
                height={60}
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
        <NestedSubObj
          disNameArray={disNameArray}
          nestedToDoArray={nestedToDoArray}
          user={user}
          arrayID={arrayID}
        />
      )}
    </form>
  );
}

DisplayTodoByID.propTypes = {
  nestedArrayToDo: PropTypes.object.isRequired,
  nestedToDoArray: PropTypes.object.isRequired,
};
