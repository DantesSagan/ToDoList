import NavBarAndHeader from '../pages/navBar';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { getUserByUsername } from '../services/firebase';

import * as ROUTES from '../constants/routes';
import Photo from '../Components/profile/userPhotos/photo';
import Footer from './footer';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      let [user] = await getUserByUsername(username);
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
      <div className='h-screen'>
        <NavBarAndHeader user={user} />
        <form className='block mx-auto max-w-screen-lg  p-4 m-12 bg-white rounded-lg border-t border-4 border-red-600 grid dashboardPage'>
          <div className='2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl font-bold p-4 m-2'>{`User Profile ${user?.username}`}</div>
          <Link to={`/p/${user?.username}/settings`}>
            <button className='bg-black hover:bg-red-600 p-4 rounded-lg text-white font-bold 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/3 transition'>
              Settings
            </button>
          </Link>
        </form>
        <Photo user={user} />
      <Footer />
      </div>
    </div>
  ) : null;
}
