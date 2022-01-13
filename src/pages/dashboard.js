import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import LoggedInUserContext from '../context/logged-in-user';
import useUser from '../hooks/user';

import IndexToDo from '../Components/toDoApp/index';
import UserNavBar from './userNavBar';
import NavBarAndHeader from './navBar';
export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);

  useEffect(() => {
    document.title = 'ToDoList';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <NavBarAndHeader />
      <div className='grid grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg'>
        <IndexToDo />
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object,
};
