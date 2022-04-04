import React, { useEffect, useState } from 'react';

export default function GetNestedToDo({
  setUntilTime,
  untilTime,
  deleteToDo,
  clickTitle,
  title,
  setTitle,
  editTitle,
  setClickTitle,
  setClickToDo,
  disNameArray,
  item,
  ind,
  toDo,
  setToDo,
  clickToDo,
  editToDoList,
  doneToDo,
  handleDoneToDo,
  handleStamp,
  changeDate,
  setChangeDate,
  handleZeroStamp,
  setDoneToDo,
  redFlagToDoList,
  flags,
  setFlags,
  colors,
  setColors,
}) {
  const [array, setArray] = useState([]);
  // console.log(
  //   disNameArray[item][ind].doneToDo !== doneToDo
  //     ? console.log('Not a toDo')
  //     : console.log('ToDo by defalt')
  // );
  // console.log(disNameArray[item][ind].toDo instanceof Array);

  // const toDoArray = [];
  // const nestedToDoUL = Object.keys(disNameArray).map((toDoIndex) => {
  //   return toDoArray.push(disNameArray[item][ind].toDo[toDoIndex]);
  // });
  useEffect(() => {
    async function SendColors() {
      const response = await setColors(array);
      return response;
    }
    SendColors();
  }, []);

  return (
    <div className='p-4 rounded-lg h-full '>
      {/* Delete toDo by toDoID */}
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
      {/* Get - title - in toDosArray */}
      {/* 
                By default state - true - and if you clicking on a title of a toDoList 
                state will changed to false and you will see textarea,
                 where you can change you title of current toDo
                */}
      {clickTitle ? (
        <div className='block'>
          <textarea
            defaultValue={disNameArray[item][ind].title}
            className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-lg font-bold '
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className={`block p-2 bg-green-600 w-2/5 h-full m-2 text-white hover:bg-green-400 rounded-lg ${
              !title && 'opacity-25'
            }`}
            onClick={editTitle}
          >
            EditTitle
          </button>
          <button
            className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
            onClick={() => setClickTitle(!clickTitle)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className='text-3xl font-bold p-2 rounded-lg m-2 hover:bg-red-400 hover:text-white title'
          onClick={() => setClickTitle(!clickTitle)}
        >
          <div className='grid grid-rows-1 grid-flow-col gap-4'>
            <div
              className='text-3xl font-bold p-4 title col-span-3'
              key={item.id}
            >
              {disNameArray[item][ind].title} <br key={item.id} />{' '}
            </div>
            <div
              id='flags'
              className='m-auto p-4  rounded-lg transition duration-300'
            >
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
                            array.push('red');
                            redFlagToDoList();
                            console.log('Youre click the button');
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
                            array.push('green');
                            redFlagToDoList();
                            console.log('Youre click the button');
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
                           array.push('gray');
                            redFlagToDoList();
                            console.log('Youre click the button');
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
                            array.push('red');
                            redFlagToDoList();
                            console.log('Youre click the red button');
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
                            array.push('green');
                            redFlagToDoList();
                            console.log('Youre click the button');
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
                            array.push('gray');
                            redFlagToDoList();
                            console.log('Youre click the button');
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
            </div>
          </div>
          <br />
        </button>
      )}
      <hr className='border border-red-600' id='hrr' />
      {/* Get - toDo - in toDosArray */}
      {/* Check to completed toDo */}
      <div className='pt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 cursor-pointer border-2 border-solid border-black rounded-2xl hover:bg-gray-300'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          onClick={handleDoneToDo}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 13l4 4L19 7'
          />
        </svg>
      </div>
      <section>
        {disNameArray[item][ind].doneToDo === true ? (
          <s className=''>
            {' '}
            {disNameArray[item][ind].toDo instanceof Array ? (
              <ul className='text-left border-l-2 border-red-600 rounded-lg opacity-50'>
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
          </s>
        ) : (
          <div>
            {clickToDo ? (
              <div className='block'>
                <textarea
                  placeholder='Write todos with commas for separate items.'
                  className='text-sm text-gray-base h-36 mr-3 m-3 py-5 px-4 rounded-lg font-bold w-full'
                  defaultValue={disNameArray[item][ind].toDo}
                  onChange={(e) => setToDo(e.target.value)}
                />
                <button
                  className={`block p-2 bg-green-600 w-2/5 h-full m-2 text-white hover:bg-green-400 rounded-lg ${
                    !toDo && 'opacity-25'
                  }`}
                  onClick={editToDoList}
                >
                  EditToDo
                </button>
                <button
                  className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
                  onClick={() => setClickToDo(!clickToDo)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className='text-xl font-bold p-2 rounded-lg hover:bg-red-400 hover:text-white'
                onClick={() => setClickToDo(!clickToDo)}
              >
                {disNameArray[item][ind].doneToDo !== doneToDo ? (
                  <s className=''>
                    {' '}
                    {disNameArray[item][ind].toDo instanceof Array ? (
                      <ul className='text-left border-l-2 border-red-600 rounded-lg opacity-50'>
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
                  </s>
                ) : (
                  <div>
                    {disNameArray[item][ind].toDo instanceof Array ? (
                      <ul className='text-left border-l-2 border-red-600 rounded-lg'>
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
                )}{' '}
              </button>
            )}
          </div>
        )}
      </section>

      {/* Get - createdAt - in toDosArray */}
      <div className='text-sm font-bold p-2'>
        {disNameArray[item][ind].createdAt} <br />
      </div>
      <div className='text-sm font-bold p-2 border border-ted-400'>
        Until this time - {disNameArray[item][ind].untilTime}
        <br />
      </div>
      {/* Change deadline data */}
      <br />
      <div className='border-2 border-red-600 p-2 rounded-lg shadow-inner'>
        {/* Hidded button and if you click you will see deadline change button */}
        {changeDate ? (
          <div>
            <label htmlFor='until'>Change deadline!</label>
            <input
              className='text-2xl p-2 ml-4   border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 pb-2 rounded-lg hover:text-white'
              onChange={(e) => setUntilTime(e.target.value)}
              type='date'
              id='until'
              name='trip-start'
              value={untilTime}
              min='2021-12-31'
              max='2078-12-31'
            />
            <br />
            <button
              onClick={(event) => handleStamp(event)}
              className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
            >
              Change date
            </button>{' '}
            <button
              onClick={() => setChangeDate(!changeDate)}
              className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleZeroStamp}
              className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
            >
              Without deadline
            </button>
            <button
              onClick={() => setChangeDate(!changeDate)}
              className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
            >
              Change deadline!
            </button>
          </div>
        )}
      </div>
      {/* Get - displayName - in toDosArray */}
      <div className='text-sm font-bold p-2 underline'>
        {disNameArray[item][ind].displayName} <br />
      </div>
    </div>
  );
}
