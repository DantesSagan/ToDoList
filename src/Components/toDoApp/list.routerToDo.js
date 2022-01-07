import React from 'react';
import { Link } from 'react-router-dom';

export default function RouterToDo({ toDoID, title, toDosArray, user }) {
  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });
  const toDoArr = Object.keys(disNameArray).map((item) => {
    return (
      <div className='justrify-center text-2xl bg-white rounded-xl m-2 hover:bg-red-600 hover:text-white shadow-inner'>
        {user?.username === disNameArray[item][0].displayName ? (
          <Link to={`/todolist/${disNameArray[item][0].toDoID}`}>
            {' '}
            <div className='text-3xl font-bold pb-4 pr-4 pl-4 pt-4'>
              {disNameArray[item][0].title} <br />
            </div>
            <hr className='border border-red-600 ml-4 mr-4 m-2' />
            <div className='text-2xl pb-4 pr-4 pl-4 pt-4'>
              {disNameArray[item][0].toDo} <br />
            </div>
            {` `}
          </Link>
        ) : null}
      </div>
    );
  });

  console.log(toDoArr);

  return (
    <div>
      <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl '>
        <div className='m-4 p-4 rounded-lg'>{toDoArr}</div>
      </form>
    </div>
  );
}
