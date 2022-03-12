import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import LoggedInUserContext from '../../../context/logged-in-user';
import useUser from '../../../hooks/user';

import UserNavBar from '../../../pages/userNavBar';
import Footer from '../../../pages/footer';
import IndexNestedToDo from './indexNestedToDo';
export default function DashboardDisplayNestedToDo({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);

  useEffect(() => {
    document.title = 'Nested';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <section className='bgMainNested'>
        <UserNavBar />
        <div className='grid grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg'>
          <IndexNestedToDo />
        </div>
        <Footer />
      </section>
    </LoggedInUserContext.Provider>
  );
}

DashboardDisplayNestedToDo.propTypes = {
  user: PropTypes.object,
};
