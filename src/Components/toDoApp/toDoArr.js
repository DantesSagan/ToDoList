import { Link } from 'react-router-dom';

export const ToDoArr = ({ disNameArray, user, formatTime }) => {
  return Object.keys(disNameArray).map((item) => {
    const doneEqualToTrue =
      user?.username === disNameArray[item].toDosArray.displayName;
    return (
      <div className='justify-center bg-white rounded-xl hover:bg-red-600 hover:text-white shadow-inner mb-2 dashboardPage borderHover transition duration-300'>
        {doneEqualToTrue && (
          <div>
            {disNameArray[item].toDosArray.untilTime === formatTime() ||
            disNameArray[item].toDosArray.untilTime < formatTime() ? (
              <Link to={`/todolist/${disNameArray[item].toDosArray.toDoID}`}>
                <p className='text-3xl p-4 title'>
                  Задание просрочено!|Time is out for task - <br />
                  <span className='bg-red-500 rounded-lg'>
                    {disNameArray[item].toDosArray.untilTime}
                  </span>{' '}
                  {` `}= {formatTime()}
                </p>
              </Link>
            ) : disNameArray[item].toDosArray.untilTime === 0 ? (
              <Link to={`/todolist/${disNameArray[item].toDosArray.toDoID}`}>
                {' '}
                <div className='grid grid-rows-1 grid-flow-col gap-4'>
                  <div className='text-3xl font-bold p-4 title'>
                    {disNameArray[item].toDosArray.title} <br />{' '}
                  </div>
                  <div
                    id='flags'
                    className='m-auto p-4  rounded-lg transition duration-300'
                  >
                    <section className='inline-block'>
                      <button className='buttonM dropdown text-white'>
                        {disNameArray[item].toDosArray.importance ? (
                          <div>
                            {disNameArray[item].toDosArray.importance[0] ===
                            'red' ? (
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
                            ) : disNameArray[item].toDosArray.importance[0] ===
                              'green' ? (
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
                            ) : disNameArray[item].toDosArray.importance[0] ===
                              'gray' ? (
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
                            ) : disNameArray[item].toDosArray.importance[0] ===
                              'white' ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-12 w-12 svg'
                                fill='white'
                                viewBox='0 0 24 24'
                                stroke='gray'
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
                <hr className='border border-red-600 ml-4 mr-4 m-2' id='hrr' />
                <div className='text-1xl p-4'>
                  {disNameArray[item].toDosArray.doneToDo ? (
                    <s className='opacity-50'>
                      {disNameArray[item].toDosArray.toDo} <br />
                    </s>
                  ) : (
                    <div>
                      {' '}
                      <div>
                        {disNameArray[item].toDosArray.toDo instanceof Array ? (
                          <ul>
                            {Object.keys(
                              disNameArray[item].toDosArray.toDo
                            ).map((toDoIndex) => {
                              return (
                                <li className='p-1 hover:underline'>
                                  {
                                    disNameArray[item].toDosArray.toDo[
                                      toDoIndex
                                    ]
                                  }{' '}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          disNameArray[item].toDosArray.toDo
                        )}
                      </div>{' '}
                      <br />
                    </div>
                  )}
                </div>
                {` `}
              </Link>
            ) : (
              <Link to={`/todolist/${disNameArray[item].toDosArray.toDoID}`}>
                {' '}
                <div className='text-3xl font-bold p-4 title'>
                  {disNameArray[item].toDosArray.title} <br />
                </div>
                <hr className='border border-red-600 ml-4 mr-4 m-2' id='hrr' />
                <div className='text-1xl p-4'>
                  {disNameArray[item].toDosArray.doneToDo ? (
                    <s className='opacity-50'>
                      {disNameArray[item].toDosArray.toDo} <br />
                    </s>
                  ) : (
                    <div>
                      {' '}
                      <div>
                        {disNameArray[item].toDosArray.toDo instanceof Array ? (
                          <ul>
                            {Object.keys(
                              disNameArray[item].toDosArray.toDo
                            ).map((toDoIndex) => {
                              return (
                                <li className='p-1 hover:underline'>
                                  {
                                    disNameArray[item].toDosArray.toDo[
                                      toDoIndex
                                    ]
                                  }{' '}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          disNameArray[item].toDosArray.toDo
                        )}
                      </div>{' '}
                      <br />
                    </div>
                  )}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                    />
                  </svg>
                </div>
                {` `}
              </Link>
            )}
          </div>
        )}
      </div>
    );
  });
};
