import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import AppMain from '../Components/AppMain';
import NavBarAndHeader from '../main/navBar';
import LoggedInUserContext from '../context/logged-in-user';
import useUser from '../hooks/user';

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser);
  useEffect(() => {
    document.title = 'ToDoList';
  }, []);
  return (
      <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
        <NavBarAndHeader />
        <AppMain />
      </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
