/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';

import useUser from '../../hooks/user';
import UserContext from '../../context/user';

import DisplayUser from './userSettings/displayUser';
import UserNavBar from '../../pages/userNavBar';
import Footer from '../../pages/footer';

export default function Setting() {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    document.title = `Settings -  ${user?.username} Profile`;
  }, []);

  return (
    <div className='h-screen'>
      <UserNavBar />
      <DisplayUser />
      <Footer />
    </div>
  );
}
