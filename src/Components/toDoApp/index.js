import React, { useState, useContext, useRef } from 'react';

import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/user';

import useUser from '../../hooks/user';
import FormToDo from './add-to-do.withoutFirebase.testOne';

import HeaderToDo from './header.toDo';
import ListOfToDo from './list.toDo';

export default function IndexToDo() {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [toDo, setToDo] = useState('');
  const [title, setTitle] = useState('');

  const [createdAt] = useState(Number);

  const [toDosArray, setToDoSArray] = useState([]);

  const { firebaseLib, FieldValue } = useContext(FirebaseContext);

  const refTodo = useRef(null);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const { user } = useUser(displayName?.uid);

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
              loading={loading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
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
              loading={loading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
