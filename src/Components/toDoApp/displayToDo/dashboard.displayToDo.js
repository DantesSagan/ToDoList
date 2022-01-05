import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import NavBarAndHeader from '../../../pages/navBar';
import LoggedInUserContext from '../../../context/logged-in-user';
import useUser from '../../../hooks/user';

import IndexDisplayToDo from './indexDisplayToDo';
export default function DashboardDisplayToDo({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);

  useEffect(() => {
    document.title = 'ToDoList';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <NavBarAndHeader />
      <div className='grid grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg'>
        <IndexDisplayToDo />
      </div>
    </LoggedInUserContext.Provider>
  );
}

DashboardDisplayToDo.propTypes = {
  user: PropTypes.object,
};
