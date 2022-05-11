import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../context/user';
import useUser from '../../hooks/user';

import * as ROUTES from '../../constants/routes';
import { getNestedToDo } from '../../services/firebase';
import { Skeleton } from '@material-ui/lab';

export default function HeaderToDo() {
  const [loading, setloading] = useState(false);
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  const navigate = useNavigate();
  const [nestedArrayToDo, setNestedArrayToDo] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      try {
        getNestedToDo(setNestedArrayToDo).then((data) => setloading(!loading));
      } catch (error) {
        setNestedArrayToDo([]);
        console.log(error);
        return null;
      }
    }, 500);
  }, []);

  const nestedToDoArray = nestedArrayToDo;
  console.log(nestedToDoArray);
  // console.log(ROUTES.SUBCOLLECTION);
  // return Object.keys(nestedToDoArray).map((itemsNested) => {
  //   // console.log(nestedArrayToDo);
  //   //  4th
  //   return Object.keys(nestedToDoArray[itemsNested]).map((index) => {
  //     let toDoNestedID = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`;
  //     let currentPath = window.location.pathname;
  //     let compareID = toDoNestedID === currentPath;
  //   });
  // });
  return (
    <div className='mb-6 border-b-2 border-red-600 rounded-lg'>
      {loading ? (
        <div
          className='flex border-l border-red-600 h-4 p-4 py-8 rounded-lg'
          style={{ backdropFilter: 'blur(15px)' }}
        >
          <div className='flex items-center'>
            <i className='text-3xl'>
              Welcome - <strong>{user?.username}</strong>
            </i>{' '}
          </div>{' '}
        </div>
      ) : (
        <Skeleton
          animation='wave'
          variant='text'
          height={100}
          className='flex p-4 rounded-lg'
        />
      )}
      <div className='grid grid-rows-1 grid-flow-col gap-4'>
        <div className='grid justify-items-start mt-6'>
          <button
            disabled={
              ROUTES.DASHBOARD === window.location.pathname ? true : false
            }
            className={`text-3xl ${
              ROUTES.DASHBOARD === window.location.pathname
                ? 'opacity-40 '
                : 'opacity-100'
            }`}
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 hover:bg-red-600 rounded-lg hover:text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        <div className='grid justify-items-end mt-6'>
          <button
            // disabled={
            //   ROUTES.SUBCOLLECTION !== ROUTES.NESTEDTODOLIST &&
            //   ROUTES.SUBCOLLECTION !== ROUTES.DASHBOARD
            //     ? true
            //     : false
            // }
            // className={`text-3xl ${
            //   ROUTES.SUBCOLLECTION === window.location.pathname ||
            //   ROUTES.SUBCOLLECTION !== ROUTES.DASHBOARD
            //     ? 'opacity-60'
            //     : 'opacity-100'
            // }`}
            onClick={() => navigate(+1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 hover:bg-red-600 rounded-lg hover:text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
