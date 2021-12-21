import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants/defaultPaths';

import UserContext from '../../context/user';
import useUser from '../../hooks/user';

export default function HeaderToDo() {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  return (
    <div>
      {user && (
        <div className='flex border-b border-red-600 h-4 p-4 py-8'>
          <div className='flex items-center'>
            <Link to={`/p/${user?.username}`}>
              <img
                className='rounded-full h-8 w-8 flex'
                src={`/images/avatars/${user?.username}.jpg`}
                alt={`${user?.username} profile`}
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE_PATH;
                }}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
