import NavBarAndHeader from '../pages/navBar';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getUserByUsername } from '../services/firebase';

import * as ROUTES from '../constants/routes';

export default function UserNavBar() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, navigate]);

  return user?.username ? <NavBarAndHeader /> : null;
}
