// import CheckUserTodo from './actions/checkUserTodo';
import FormToDo from './add-to-do.withoutFirebase.testOne';

import HeaderToDo from './header.toDo';
import RouterToDo from './list.routerToDo';
import ListOfToDo from './list.toDo';

export default function IndexToDo({
  user,
  toDosArray,
  title,
  toDo,
  setTitle,
  setToDo,
  displayName,
  setToDoSArray,
  createdAt,
  toDoID,
  firebaseLib,
  FieldValue,
  refTodo,
}) {
  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
      <div className='flex flex-col w-2/2'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl'>
            <HeaderToDo user={user} />
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
            />
            <ListOfToDo
              toDo={toDo}
              setToDo={setToDo}
              title={title}
              setTitle={setTitle}
              toDosArray={toDosArray}
              setToDoSArray={setToDoSArray}
              displayName={displayName}
              createdAt={createdAt}
              toDoID={toDoID}
            />
            {/* <RouterToDo toDoID={toDoID} title={title} toDosArray={toDosArray} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
