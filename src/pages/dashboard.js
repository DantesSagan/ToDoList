import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import NavBarAndHeader from '../main/navBar';
import LoggedInUserContext from '../context/logged-in-user';
import useUser from '../hooks/user';
import AddToDoTwo from '../Components/toDoApp/add-to-do.withoutFirebase.testOne';

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser?.uid);
  useEffect(() => {
    document.title = 'ToDoList';
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <NavBarAndHeader />
      <AddToDoTwo />
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
