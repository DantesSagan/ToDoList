import React from 'react';

export default function IndexTasks({
  disNameArray,
  item,
  clickToDo,
  setToDo,
  toDo,
  editToDoList,
  setClickToDo,
  doneToDo,
}) {
  return (
    <section>
      {disNameArray[item].toDosArray.doneToDo === true ? (
        <s className=''>
          {' '}
          {disNameArray[item].toDosArray.toDo instanceof Array ? (
            <ul className='text-left border-l-2 border-red-600 rounded-lg opacity-50'>
              {Object.keys(disNameArray[item].toDosArray.toDo).map(
                (toDoIndex) => {
                  return (
                    <li className='p-1 hover:underline'>
                      {disNameArray[item].toDosArray.toDo[toDoIndex]}{' '}
                    </li>
                  );
                }
              )}
            </ul>
          ) : (
            disNameArray[item].toDosArray.toDo
          )}
        </s>
      ) : (
        <div>
          {clickToDo ? (
            <div className='block'>
              <textarea
                placeholder='Write todos with commas for separate items.'
                className='text-sm text-gray-base h-36 mr-3 m-3 py-5 px-4 rounded-lg font-bold w-full'
                defaultValue={disNameArray[item].toDosArray.toDo}
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
              {disNameArray[item].toDosArray.doneToDo !== doneToDo ? (
                <s className=''>
                  {' '}
                  {disNameArray[item].toDosArray.toDo instanceof Array ? (
                    <ul className='text-left border-l-2 border-red-600 rounded-lg opacity-50'>
                      {Object.keys(disNameArray[item].toDosArray.toDo).map(
                        (toDoIndex) => {
                          return (
                            <li className='p-1 hover:underline'>
                              {disNameArray[item].toDosArray.toDo[toDoIndex]}{' '}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  ) : (
                    disNameArray[item].toDosArray.toDo
                  )}
                </s>
              ) : (
                <div>
                  {disNameArray[item].toDosArray.toDo instanceof Array ? (
                    <ul className='text-left border-l-2 border-red-600 rounded-lg'>
                      {Object.keys(disNameArray[item].toDosArray.toDo).map(
                        (toDoIndex) => {
                          return (
                            <li className='p-1 hover:underline'>
                              {disNameArray[item].toDosArray.toDo[toDoIndex]}{' '}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  ) : (
                    disNameArray[item].toDosArray.toDo
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
