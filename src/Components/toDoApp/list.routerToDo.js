import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
export default function RouterToDo({ toDoID, title, toDosArray, user }) {
  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });
  const toDoArr = Object.keys(disNameArray).map((item) => {
    return (
      <div className='justrify-center text-2xl border border-red-600 pl-0 pr-5 bg-white rounded-xl m-2 '>
        {user?.username === disNameArray[item][0].displayName ? (
          <Link to={`/todolist/${disNameArray[item][0].toDoID}`}>
            {' '}
            <strong>
              Link to {disNameArray[item][0].title} <br />
              {` `}
            </strong>
          </Link>
        ) : null}
      </div>
    );
  });
  const titleArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });
  const titles = Object.keys(titleArray).map((item) => {
    return disNameArray[item][0].title;
  });
  console.log(toDoArr);

  return (
    <div>
      <form className='bg-black p-4 rounded-lg hover:bg-red-400'>{toDoArr}</form>
    </div>
  );
}
