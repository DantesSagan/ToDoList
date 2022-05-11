import { useEffect, useState } from 'react';
import { getNestedToDo } from '../../../../services/firebase';

import Skeleton from '@material-ui/lab/Skeleton';

import IndexConst from '../../indexConst';
import ListOfSubDisplayToDo from './sub.listNestedToDo';
import HeaderSubToDo from './toDoMembers/HeaderSubToDo';

export default function IndexSubToDo() {
  const {
    toDo,
    setToDo,
    title,
    setTitle,
    userId,
    createdAt,
    toDosArray,
    setToDoSArray,
    firebaseLib,
    FieldValue,
    refTodo,
    user,
    toDoID,
    displayName,
    nestedArrayToDo,
    setNestedArrayToDo,
    arrayID,
    setArrayID,
  } = IndexConst();

  const [loadingNested, setLoadingNested] = useState(true);

  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID).then((doc) => {
        setLoadingNested(false);
      });
    } catch (error) {
      console.log(error);
    }
    // getToDo(setToDoSArray);
  }, []);
  // const disNameArray = Object.keys(toDosArray).map((item) => {
  //   return toDosArray[item].toDosArray;
  // });

  const skeletonArray = Array(1).fill('');

  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center mb-60'>
      <div className='flex flex-col w-2/2'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl'>
            {loadingNested ? (
              <>
                {skeletonArray.map((fall) => {
                  return (
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
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
                <HeaderSubToDo
                  user={user}
                  nestedArrayToDo={nestedArrayToDo}
                  setNestedArrayToDo={setNestedArrayToDo}
                  arrayID={arrayID}
                  setArrayID={setArrayID}
                  setToDoSArray={setToDoSArray}
                  // disNameArray={disNameArray}
                />
                <ListOfSubDisplayToDo
                  toDo={toDo}
                  setToDo={setToDo}
                  title={title}
                  setTitle={setTitle}
                  toDosArray={toDosArray}
                  setToDoSArray={setToDoSArray}
                  firebaseLib={firebaseLib}
                  FieldValue={FieldValue}
                  displayName={displayName}
                  user={user}
                  refTodo={refTodo}
                  createdAt={createdAt}
                  toDoID={toDoID}
                  userId={userId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
