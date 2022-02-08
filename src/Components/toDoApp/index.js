import { useState } from 'react';
import FormToDo from './add-to-do.creatingToDo';

import HeaderToDo from './header.toDo';
import IndexConst from './indexConst';
import ListOfToDo from './list.toDo';

export default function IndexToDo() {
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
  } = IndexConst();
  const [createToDo, setCreateToDo] = useState(false);

  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center mb-60 border-l-2 border-solid border-red-600 rounded-xl'>
      <div className='flex flex-col w-2/2'>
        <div className='flex flex-col items-center'>
          <div className='w-full py-5 px-4 text-xl '>
            <HeaderToDo user={user} />
            {/* <SkeletonTheme baseColor='#202020' highlightColor='#444'>
              <>
                <Skeleton
                  wrapper={}
                />
              </>
            </SkeletonTheme> */}
            <FormToDo
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
              createToDo={createToDo}
              setCreateToDo={setCreateToDo}
            />
            <ListOfToDo
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
        </div>
      </div>
    </div>
  );
}
