import { useEffect } from 'react';
import { getNestedToDo } from '../../../services/firebase';
import HeaderToDo from '../header.toDo';

import IndexConst from '../indexConst';
import FormToDoToDoID from './displayAddingToDo';
import ListOfDisplayToDo from './listToDo.displayToDo';

export default function IndexDisplayToDo() {
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
  } = IndexConst();

  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo);
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
  }, []);

  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center mb-40 border-r-2 border-solid border-red-600 rounded-xl '>
      <div className='flex flex-col w-2/2'>
        <div className='flex flex-col items-center'>
          <div className='w-full py-5 px-4 text-xl '>
            <HeaderToDo
              user={user}
              nestedArrayToDo={nestedArrayToDo}
              setNestedArrayToDo={setNestedArrayToDo}
            />
            <FormToDoToDoID
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
            <ListOfDisplayToDo
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
