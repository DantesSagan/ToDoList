import React from 'react';
import { Link } from 'react-router-dom';

export default function DeadLine({ disNameArray, item, ind, formatTime }) {
  return (
    <Link to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}>
      <div className='text-3xl p-4 m-2 bg-white rounded-xl hover:bg-red-600'>
        Задание просрочено! <br />
        Срок:
        <span className='bg-red-500 rounded-lg'>
          {disNameArray[item][ind].untilTime}
        </span>{' '}
        {` `}до, включительно {formatTime()}
      </div>
    </Link>
  );
}
