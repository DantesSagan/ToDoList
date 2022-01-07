import { useState } from 'react';

export const DisplayTodoByID = ({
  toDosArray,
  user,
  deleteToDo,
  title,
  setTitle,
  toDo,
  setToDo,
  editToDoList,
  editTitle,
}) => {
  const [clickTitle, setClickTitle] = useState(false);
  const [clickToDo, setClickToDo] = useState(false);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's

  return Object.keys(disNameArray).map((item) => {
    // this is comparison for checking pathname of url from link to this page
    // and comparison with toDoID for receiving data from Firebase
    let currentUrl = window.location.pathname;
    let todoURL = `/todolist/${disNameArray[item][0].toDoID}`;
    let checkTODOID = currentUrl === todoURL;

    console.log(checkTODOID);
    console.log(currentUrl);
    return (
      <div className='pt-2'>
        {/* 
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser 
          And additionally checking if current route path strict-equal to toDoID
          */}
        {user?.username === disNameArray[item][0].displayName
          ? checkTODOID && (
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
                    <div className='block'>
                      <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      >
                        {disNameArray[item][0].title}
                      </textarea>{' '}
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
                      className='text-2xl font-bold p-2 rounded-lg m-2 hover:bg-red-400 hover:text-white'
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
                      className='text-xl font-bold p-2 rounded-lg m-2 hover:bg-red-400 hover:text-white '
                      onClick={() => setClickToDo(!clickToDo)}
                    >
                      <ul>
                        <li>
                          {disNameArray[item][0].toDo} <br />
                        </li>
                      </ul>
                    </button>
                  )}

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
            )
          : null}
      </div>
    );
  });
};
