import { useEffect, useState } from 'react';
import LoaderTest from '../../../../../fallback/loaderTest';
import IndexSubHeader from '../actions/headerSub';

export default function GetNestedToDoArray({
  deleteSubToDo,
  handleDoneToDoSub,
  handleSubStamp,
  handleSubZeroStamp,
  clickToDo,
  nestedToDoArray,
  itemsNested,
  index,
  setToDo,
  toDo,
  editSubToDo,
  setClickToDo,
  changeDate,
  setChangeDate,
  doneToDo,
  setUntilTime,
  untilTime,
  colors,
  setColors,
  flags,
  setFlags,
  handleSubFlags,
  isPending,
}) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    async function SendColors() {
      const response = await setColors(array);
      return response;
    }
    SendColors();
  }, []);

  return (
    <div className='p-4 rounded-lg borderHover'>
      {/* Delete toDo by toDoID */}
      <IndexSubHeader
        nestedToDoArray={nestedToDoArray}
        itemsNested={itemsNested}
        index={index}
        colors={colors}
        setColors={setColors}
        flags={flags}
        setFlags={setFlags}
        handleSubFlags={handleSubFlags}
        array={array}
        deleteSubToDo={deleteSubToDo}
      />
      {/* 
                    By default state - true - and if you clicking on a title of a toDoList 
                    state will changed to false and you will see textarea,
                     where you can change you title of current toDo
                    */}

      <hr className='border border-red-600 mt-6' id='hrr' />

      {/* Get - toDo - in toDosArray */}
      {/* Check to completed toDo */}
      <div className='rounded-lg'>
        <div className='pt-4'>
          {isPending ? (
            <LoaderTest />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 cursor-pointer border-2 border-solid border-black rounded-2xl hover:bg-gray-300 '
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              onClick={handleDoneToDoSub}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              />
            </svg>
          )}
        </div>
        <section>
          {nestedToDoArray[itemsNested][index].doneToDo === true ? (
            <s className=''>
              {nestedToDoArray[itemsNested][index].toDo instanceof Array ? (
                <ul className='text-left border-l-2 border-red-600 rounded-lg opacity-50 m-2'>
                  {Object.keys(nestedToDoArray[itemsNested][index].toDo).map(
                    (toDoIndex) => {
                      return (
                        <li className='p-1 hover:underline'>
                          {nestedToDoArray[itemsNested][index].toDo[toDoIndex]}{' '}
                        </li>
                      );
                    }
                  )}
                </ul>
              ) : (
                nestedToDoArray[itemsNested][index].toDo
              )}
            </s>
          ) : (
            <div>
              {clickToDo ? (
                <div className='block cursor-pointer'>
                  <textarea
                    className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-lg font-bold'
                    defaultValue={nestedToDoArray[itemsNested][index].toDo}
                    onChange={(e) => setToDo(e.target.value)}
                  />
                  <button
                    className={`block p-2 bg-green-600 w-2/5 h-full m-2 text-white hover:bg-green-400 rounded-lg ${
                      !toDo && 'opacity-25'
                    }`}
                    onClick={editSubToDo}
                  >
                    Edit Sub ToDo
                  </button>
                  <button
                    className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
                    onClick={() => setClickToDo(!clickToDo)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div
                  className='text-xl font-bold rounded-lg p-2 hover:bg-red-400 hover:text-white cursor-pointer '
                  onClick={() => setClickToDo(!clickToDo)}
                >
                  {nestedToDoArray[itemsNested][index].doneToDo !== doneToDo ? (
                    <s className=''>
                      {nestedToDoArray[itemsNested][index].toDo instanceof
                      Array ? (
                        <ul className='text-left border-l-2 border-red-600 rounded-lg opacity-50'>
                          {Object.keys(
                            nestedToDoArray[itemsNested][index].toDo
                          ).map((toDoIndex) => {
                            return (
                              <li className='p-1 hover:underline'>
                                {
                                  nestedToDoArray[itemsNested][index].toDo[
                                    toDoIndex
                                  ]
                                }{' '}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        nestedToDoArray[itemsNested][index].toDo
                      )}
                    </s>
                  ) : (
                    <div key={itemsNested.id}>
                      {nestedToDoArray[itemsNested][index].toDo instanceof
                      Array ? (
                        <ul className='text-left border-l-2 border-red-600 rounded-lg '>
                          {Object.keys(
                            nestedToDoArray[itemsNested][index].toDo
                          ).map((toDoIndex) => {
                            return (
                              <li className='p-1 hover:underline '>
                                {
                                  nestedToDoArray[itemsNested][index].toDo[
                                    toDoIndex
                                  ]
                                }{' '}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        nestedToDoArray[itemsNested][index].toDo
                      )}
                    </div>
                  )}{' '}
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Get - createdAt - in toDosArray */}
      <div className='text-sm m-2 mt-4 font-bold'>
        {nestedToDoArray[itemsNested][index].createdAt} <br />
      </div>
      <div className='text-sm font-bold p-2 border border-ted-400'>
        Until this time - {nestedToDoArray[itemsNested][index].untilTime}
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
              onClick={(event) => handleSubStamp(event)}
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
              onClick={handleSubZeroStamp}
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
      <div className='text-sm font-bold underline m-2 '>
        {nestedToDoArray[itemsNested][index].displayName} <br />
      </div>
    </div>
  );
}
