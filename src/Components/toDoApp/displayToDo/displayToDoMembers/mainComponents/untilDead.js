import React from 'react';
import { Link } from 'react-router-dom';

export default function UntilDead({ disNameArray, item, ind }) {
  return (
    <Link
      to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
      key={item.id}
    >
      <div
        className='text-3xl font-bold p-2 ml-4 mr-4 hover:underline title '
        key={item.id}
      >
        {disNameArray[item][ind].title} <br key={item.id} />
      </div>
      <hr className='border border-red-600 ml-4 mr-4 ' key={item.id} id='hrr' />
      <div className='text-1xl p-2 ml-2 hover:underline' key={item.id}>
        {disNameArray[item][ind].doneToDo ? (
          <s className='opacity-50 ml-5'>
            <div className='opacity-50 ml-5'>
              {disNameArray[item][ind].toDo instanceof Array ? (
                <ul>
                  {Object.keys(disNameArray[item][ind].toDo).map(
                    (toDoIndex) => {
                      return (
                        <li className='p-1 hover:underline'>
                          {disNameArray[item][ind].toDo[toDoIndex]}{' '}
                        </li>
                      );
                    }
                  )}
                </ul>
              ) : (
                disNameArray[item][ind].toDo
              )}
            </div>
          </s>
        ) : (
          <div className='ml-5'>
            {disNameArray[item][ind].toDo instanceof Array ? (
              <ul>
                {Object.keys(disNameArray[item][ind].toDo).map((toDoIndex) => {
                  return (
                    <li className='p-1 hover:underline'>
                      {disNameArray[item][ind].toDo[toDoIndex]}{' '}
                    </li>
                  );
                })}
              </ul>
            ) : (
              disNameArray[item][ind].toDo
            )}
          </div>
        )}
        <br key={item.id} />
      </div>
      {` `}
    </Link>
  );
}
