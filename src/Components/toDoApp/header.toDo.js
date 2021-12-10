import React from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants/defaultPaths';

export default function HeaderToDo({ user }) {
  return (
    <div>
      {user && (
        <div className='flex border-b border-gray-primary h-4 p-4 py-8'>
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
