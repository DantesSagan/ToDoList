import { useState } from 'react';

export const DisplayTodoByID = ({
  toDosArray,
  user,
  deleteToDo,
  title,
  setTitle,
  toDo,
  setToDo,
  editToDo,
}) => {
  const [clickTitle, setClickTitle] = useState(false);
  const [clickToDo, setClickToDo] = useState(false);
  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  //  Get - displayName - in toDosArray
  return Object.keys(disNameArray).map((item) => {
    console.log(disNameArray[item][0].toDoID);
    return (
      disNameArray[item][0].toDoID && (
        <div className='pt-2'>
          {/* 
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser
          */}
          {user?.username === disNameArray[item][0].displayName ? (
            <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
              <div className='m-4 p-4 shadow-inner rounded-lg'>
                {/* Delete toDo by toDoID */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 cursor-pointer stroke'
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
                By default state - true - and if you clicking on a title of toDoList 
                state will changed to false and you will see textarea,
                 where you can change you title of current toDo
                */}
                {clickTitle ? (
                  <div className='block justify-between'>
                    <textarea
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      {disNameArray[item][0].title}
                    </textarea>
                    <button
                      className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
                      onClick={() => setClickTitle(!clickTitle)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className='text-2xl font-bold p-2'
                    onClick={() => setClickTitle(!clickTitle)}
                  >
                    {disNameArray[item][0].title} <br />
                  </button>
                )}

                <hr className='border border-red-600' />
                {/* Get - toDo - in toDosArray */}
                {clickToDo ? (
                  <div className='block justify-between'>
                    <textarea
                      value={toDo}
                      onChange={(e) => setToDo(e.target.value)}
                    >
                      {disNameArray[item][0].toDo}
                    </textarea>
                    <button
                      className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
                      onClick={() => setClickToDo(!clickToDo)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className='text-2xl font-bold p-2'
                    onClick={() => setClickToDo(!clickToDo)}
                  >
                    {disNameArray[item][0].toDo} <br />
                  </button>
                )}
                <div className='text-2xl font-bold p-2'>
                  <div className=' duration-200 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'>
                    <button
                      className={`w-full h-full text-lg font-bold text-white ${
                        !toDo && !title && 'opacity-25'
                      }`}
                      type='button'
                      disabled={toDo.length < 1 && title.length < 1}
                      onClick={editToDo}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                {/* Get - createdAt - in toDosArray */}
                <div className='text-sm'>
                  {disNameArray[item][0].createdAt} <br />
                </div>
                {/* Get - displayName - in toDosArray */}
                <div className='text-sm font-bold p-2 underline'>
                  {disNameArray[item][0].displayName} <br />
                </div>
              </div>
            </form>
          ) : null}
        </div>
      )
    );
  });
};
