import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import LoggedInUserContext from '../../../../context/logged-in-user';
import useUser from '../../../../hooks/user';

import UserNavBar from '../../../../pages/userNavBar';
import Footer from '../../../../pages/footer';
import IndexSubToDo from './sub.indexNestedToDo';
export default function DashboardSubCollectionDisplay({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);

  useEffect(() => {
    document.title = 'SubToDo';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <UserNavBar />
      <div className='grid grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg'>
        <IndexSubToDo />
      </div>
      <Footer />
    </LoggedInUserContext.Provider>
  );
}

DashboardSubCollectionDisplay.propTypes = {
  user: PropTypes.object,
};
