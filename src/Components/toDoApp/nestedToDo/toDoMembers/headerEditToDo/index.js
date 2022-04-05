import React from 'react';

export default function IndexHeader({
  disNameArray,
  item,
  ind,
  flags,
  array,
  redFlagToDoList,
  colors,
  deleteToDo,
}) {
  return (
    <div className='grid grid-rows-1 grid-flow-col gap-4'>
      <div id='flags' className='mr-auto rounded-lg transition duration-300 '>
        <section className='inline-block'>
          {disNameArray[item][ind].importance ? (
            <button className='buttonM dropdown text-white'>
              {disNameArray[item][ind].importance[0] === 'red' ? (
                <svg
                  values={flags}
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
                  values={flags}
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
                  values={flags}
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
              ) : null}
              <div className='dropdown-content p-2'>
                {flags[0] === 'red' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 svg mt-2'
                    fill='red'
                    viewBox='0 0 24 24'
                    stroke='white'
                    strokeWidth='2'
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        window.confirm(
                          `Are you sure you want to edit this toDo = ${flags[0]}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
                        )
                      ) {
                        array.push('red');
                        redFlagToDoList();
                        console.log('Color red with existed importance');
                      } else {
                        console.log('error change');
                        return null;
                      }
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                ) : null}
                {flags[1] === 'green' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 svg mt-2'
                    fill='green'
                    viewBox='0 0 24 24'
                    stroke='white'
                    strokeWidth='2'
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        window.confirm(
                          `Are you sure you want to edit this toDo = ${flags[1]}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
                        )
                      ) {
                        array.push('green');
                        redFlagToDoList();
                        console.log('Color green with existed importance');
                      } else {
                        console.log('error change');
                        return null;
                      }
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                ) : null}
                {flags[2] === 'gray' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 svg mt-2'
                    fill='gray'
                    viewBox='0 0 24 24'
                    stroke='white'
                    strokeWidth='2'
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        window.confirm(
                          `Are you sure you want to edit this toDo = ${flags[2]}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
                        )
                      ) {
                        array.push('gray');
                        redFlagToDoList();
                        console.log('Color gray with existed importance');
                      } else {
                        console.log('error change');
                        return null;
                      }
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                ) : null}
              </div>
            </button>
          ) : (
            <button className='buttonM dropdown text-white'>
              Importance
              <div className='dropdown-content border-2 hover:border-red-600 p-2 '>
                {flags[0] === 'red' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 svg mt-2'
                    fill='red'
                    viewBox='0 0 24 24'
                    stroke='white'
                    strokeWidth='2'
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        window.confirm(
                          `Are you sure you want to edit this toDo = ${colors}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
                        )
                      ) {
                        array.push('red');
                        redFlagToDoList();
                        console.log('Color red with existed importance');
                      } else {
                        console.log('error change');
                        return null;
                      }
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                ) : null}
                {flags[1] === 'green' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 svg mt-2'
                    fill='green'
                    viewBox='0 0 24 24'
                    stroke='white'
                    strokeWidth='2'
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        window.confirm(
                          `Are you sure you want to edit this toDo = ${colors}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
                        )
                      ) {
                        array.push('green');
                        redFlagToDoList();
                        console.log('Color green with existed importance');
                      } else {
                        console.log('error change');
                        return null;
                      }
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                ) : null}
                {flags[2] === 'gray' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 svg mt-2'
                    fill='gray'
                    viewBox='0 0 24 24'
                    stroke='white'
                    strokeWidth='2'
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        window.confirm(
                          `Are you sure you want to edit this toDo = ${flags[2]}? Вы уверены, что хотите поменять список дел ${disNameArray[item][ind].title}?`
                        )
                      ) {
                        array.push('gray');
                        redFlagToDoList();
                        console.log('Color gray with existed importance');
                      } else {
                        console.log('error change');
                        return null;
                      }
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                ) : null}
              </div>
            </button>
          )}
        </section>
      </div>{' '}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 cursor-pointer stroke flex ml-auto'
        fill='black'
        viewBox='0 0 24 24'
        stroke='black'
        onClick={deleteToDo}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </div>
  );
}
