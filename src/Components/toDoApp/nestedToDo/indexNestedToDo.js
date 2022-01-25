import HeaderToDo from '../header.toDo';

import IndexConst from '../indexConst';
import ListOfNestedDisplayToDo from './listNestedToDo';

export default function IndexNestedToDo() {
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
  console.log(user);
  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center mb-60'>
      <div className='flex flex-col w-2/2'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl'>
            <HeaderToDo user={user} />
            <ListOfNestedDisplayToDo
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