import NavBarAndHeader from '../pages/navBar';

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getUserByUsername } from '../services/firebase';

import UserContext from '../context/user';
import useUser from '../hooks/user';
import { Skeleton } from '@material-ui/lab';

export default function UserNavBar() {
  const [loading, setLoading] = useState(true);
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
  // Just checking clone repo from another computer
  //   checkUserExists();
  // }, [navigate]);

  return user?.username ? (
    <NavBarAndHeader user={user} />
    ) : (
    <Skeleton variant='rectangular' height={64} className='mb-8 p-4 transition duration-500' animation='wave'></Skeleton>
  );
}
