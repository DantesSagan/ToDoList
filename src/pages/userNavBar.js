import NavBarAndHeader from '../pages/navBar';

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getUserByUsername } from '../services/firebase';

import UserContext from '../context/user';
import useUser from '../hooks/user';

export default function UserNavBar() {
  // const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  // useEffect(() => {
  //   async function checkUserExists() {
  //     if (user?.userId) {
  //       setUser(user);
  //     } else {
  //       navigate(ROUTES.NOT_FOUND);
  //     }
  //   }

  //   checkUserExists();
  // }, [navigate]);

  return user?.username ? (
    <NavBarAndHeader user={user} />
  ) : null;
}
