import React from 'react';

export default function IndexTasks({
  disNameArray,
  item,
  ind,
  clickToDo,
  setToDo,
  toDo,
  editToDoList,
  setClickToDo,
  doneToDo,
}) {
  return (
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
  );
}
