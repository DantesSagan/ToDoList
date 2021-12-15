import NavBarAndHeader from '../pages/navBar';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { getUserByUsername } from '../services/firebase';

import * as ROUTES from '../constants/routes';

export default function Profile() {
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

  return user?.username ? (
    <div>
      <NavBarAndHeader />
      <div className='mx-auto max-w-screen-lg'>
        <nav className='text-black font-bold'>
          <button className='bg-red-600 hover:bg-red-800 p-2 rounded-lg'>
            <Link to={`/p/${user?.username}/settings`}>Settings</Link>
          </button>
        </nav>
      </div>
    </div>
  ) : null;
}
