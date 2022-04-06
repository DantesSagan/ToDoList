import React from 'react';
import { Link } from 'react-router-dom';

export default function NoDeadLine({ disNameArray, item, ind }) {
  return (
    <Link
      to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
      key={item.id}
    >
      {' '}
      <div className='grid grid-rows-1 grid-flow-col gap-4'>
        <div
          className='text-3xl font-bold p-6 ml-4 mr-4 hover:underline title'
          key={item.id}
        >
          {disNameArray[item][ind].title} <br key={item.id} />{' '}
        </div>
        <div
          id='flags'
          className='m-auto p-4  rounded-lg transition duration-300'
        >
          <section className='inline-block'>
            <button className='buttonM dropdown text-white'>
              {disNameArray[item][ind].importance ? (
                <div>
                  {disNameArray[item][ind].importance[0] === 'red' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 svg'
                      fill='red'
                      viewBox='0 0 24 24'
                      stroke='black'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                      />
                    </svg>
                  ) : disNameArray[item][ind].importance[0] === 'green' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 svg'
                      fill='green'
                      viewBox='0 0 24 24'
                      stroke='black'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                      />
                    </svg>
                  ) : disNameArray[item][ind].importance[0] === 'gray' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 svg'
                      fill='gray'
                      viewBox='0 0 24 24'
                      stroke='black'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                      />
                    </svg>
                  ) : (
                    <div> Importance </div>
                  )}
                </div>
              ) : null}
            </button>
          </section>
        </div>
      </div>
      <hr className='border border-red-600 ml-4 mr-4 ' key={item.id} id='hrr' />
      <div className='text-1xl p-2 ml-2 hover:underline' key={item.id}>
        {disNameArray[item][ind].doneToDo ? (
          <s className='opacity-50 ml-5'>{disNameArray[item][ind].toDo}</s>
        ) : (
          <div className='ml-5'>{disNameArray[item][ind].toDo}</div>
        )}
        <br key={item.id} />
      </div>
      {` `}
    </Link>
  );
}
