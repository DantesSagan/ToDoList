import NavBarAndHeader from '../pages/navBar';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { getUserByUsername } from '../services/firebase';

import * as ROUTES from '../constants/routes';
import Photo from '../Components/profile/userPhotos/photo';
import UserNavBar from './userNavBar';

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
      <NavBarAndHeader user={user} />
      <div className='container block mx-auto max-w-screen-lg item-center justify-center p-4 m-12 bg-white rounded-lg border-t border-4 border-red-600'>
        <div className='text-2xl font-bold'>{`User Profile ${user?.username}`}</div>
        <Link to={`/p/${user?.username}/settings`}>
          <button className='bg-black hover:bg-red-600 p-4 rounded-lg text-white font-bold'>
            Settings
          </button>
        </Link>
      </div>
      <Photo user={user} />
    </div>
  ) : null;
}
