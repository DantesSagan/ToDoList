/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';

import useUser from '../../hooks/user';
import UserContext from '../../context/user';

import NavBarAndHeader from '../../pages/navBar';

import DisplayUser from './userSettings/displayUser';

export default function Setting() {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    document.title = `Settings -  ${user?.username} Profile`;
  }, []);

  return (
    <div>
      <NavBarAndHeader />
      <DisplayUser />
    </div>
  );
}
