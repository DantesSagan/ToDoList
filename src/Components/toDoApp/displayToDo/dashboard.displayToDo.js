import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import LoggedInUserContext from '../../../context/logged-in-user';
import useUser from '../../../hooks/user';

import IndexDisplayToDo from './indexDisplayToDo';
import UserNavBar from '../../../pages/userNavBar';
import Footer from '../../../pages/footer';
export default function DashboardDisplayToDo({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);

  useEffect(() => {
    document.title = 'RouterToDoList';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <UserNavBar />
      <div className='grid grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg '>
        <IndexDisplayToDo />
      </div>
      <Footer />
    </LoggedInUserContext.Provider>
  );
}

DashboardDisplayToDo.propTypes = {
  user: PropTypes.object,
};
