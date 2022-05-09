import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../../../../context/user';
import useUser from '../../../../../hooks/user';

import * as ROUTES from '../../../../../constants/routes';
import { getNestedToDo } from '../../../../../services/firebase';

export default function HeaderSubToDo({
  arrayID,
  setArrayID,
  nestedArrayToDo,
  setNestedArrayToDo,
  toDosArray,
  setToDoSArray,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID);
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
    // getToDo(setToDoSArray);
  }, []);

  // const disNameArray = Object.keys(toDosArray).map((item) => {
  //   return toDosArray[item].toDosArray;
  // });
  const nestedToDoArray = nestedArrayToDo;

  console.log(nestedToDoArray);
  console.log(ROUTES.SUBCOLLECTION);
  return Object.keys(nestedToDoArray).map((itemsNested) => {
    // console.log(nestedArrayToDo);
    //  4th
    let toDoNestedID = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`;

    let checkNestedID =
      arrayID[itemsNested] === nestedToDoArray[itemsNested].toDosArray.toDoID;

    let currentPath = window.location.pathname;

    let checkName =
      user?.username === nestedToDoArray[itemsNested].toDosArray.displayName;

    let compareID = toDoNestedID === currentPath;

    // return Object.keys(disNameArray).map((item) => {
    //   // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    //   // 2nd
    //   return Object.keys(disNameArray[item]).map((ind) => {
    //     let toDoMainID = `/todolist/nested/${disNameArray[item][ind].toDoID}`;

    //     let compareMainID = currentPath === toDoMainID;

    return (
      <div>
        {checkName && checkNestedID && compareID ? (
          <div className='mb-6 border-b-2 border-red-600 rounded-lg'>
            {user && (
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
            )}
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <div className='grid justify-items-start mt-6'>
                <button
                  disabled={
                    ROUTES.DASHBOARD === window.location.pathname ? true : false
                  }
                  className={`text-3xl ${
                    ROUTES.DASHBOARD === window.location.pathname
                      ? 'opacity-30 '
                      : 'opacity-100'
                  }`}
                  onClick={() => navigate(-1)}
                >
                  <svg
                    aria-selected='true'
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
                  disabled={compareID ? true : false}
                  className={`text-3xl ${
                    compareID ? 'opacity-40' : 'opacity-100'
                  }`}
                  onClick={() => navigate(+1)}
                >
                  <svg
                    aria-selected='false'
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
        ) : null}
      </div>
    );
  });
  //   });
  // });
}
