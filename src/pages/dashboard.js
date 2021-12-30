import React, { useState, useContext, useRef, useEffect } from 'react';

import FirebaseContext from '../context/firebaseContext';
import useUser from '../hooks/user';
// import CheckUserTodo from './actions/checkUserTodo';

import PropTypes from 'prop-types';

import NavBarAndHeader from '../pages/navBar';
import LoggedInUserContext from '../context/logged-in-user';

import IndexToDo from '../Components/toDoApp/index';

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);
  const [toDo, setToDo] = useState('');
  const [title, setTitle] = useState('');
  const [createdAt] = useState(Number);

  const [toDosArray, setToDoSArray] = useState([]);

  const { firebaseLib, FieldValue } = useContext(FirebaseContext);

  const refTodo = useRef(null);

  const getRandomNumber = () => {
    var alphanumeric =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    var twentyEight = 28;
    for (let i = 0; i < twentyEight; ++i) {
      result += alphanumeric.charAt(Math.random() * alphanumeric.length);
    }

    return result;
  };

  let toDoID = getRandomNumber();
  useEffect(() => {
    document.title = 'ToDoList';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <NavBarAndHeader />
      <div className='grid grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg'>
        <IndexToDo
          toDo={toDo}
          setToDo={setToDo}
          title={title}
          setTitle={setTitle}
          toDosArray={toDosArray}
          setToDoSArray={setToDoSArray}
          firebaseLib={firebaseLib}
          FieldValue={FieldValue}
          user={user}
          refTodo={refTodo}
          createdAt={createdAt}
          toDoID={toDoID}
        />
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object,
};
