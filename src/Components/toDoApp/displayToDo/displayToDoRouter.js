import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  setToDoSArray,
}) => {
  const [clickTitle, setClickTitle] = useState(false);
  const [clickToDo, setClickToDo] = useState(false);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  return Object.keys(disNameArray).map((item, index) => {
    console.log(setToDoSArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    return Object.keys(disNameArray[item]).map((ind) => {
      // this is comparison for checking pathname of url from link to this page
      // and comparison with toDoID for receiving data from Firebase
      let currentUrl = window.location.pathname;
      let todoURL = `/todolist/${disNameArray[item][0].toDoID}`;
      let checkTODOID = currentUrl === todoURL;
      let second = item;

      console.log(checkTODOID);
      console.log(currentUrl);
      console.log(disNameArray[item][index]);
      console.log(disNameArray);
      console.log(
        checkTODOID && user?.username
          ? Object.keys(disNameArray[item]).map(
              (ind) => disNameArray[item][ind].displayName
            )
          : // disNameArray[item][1].toDo
            null
      );

      return (
        <div className='pt-2 ' key={index}>
          {/* 
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser 
          And additionally checking if current route path strict-equal to toDoID
          */}
          {user?.username === disNameArray[item][0].displayName
            ? checkTODOID && (
                <form
                  className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl '
                  key={index}
                >
                  <div className='m-8 p-4 shadow-inner rounded-lg'>
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
                By default state - true - and if you clicking on a title of a toDoList 
                state will changed to false and you will see textarea,
                 where you can change you title of current toDo
                */}
                    {clickTitle ? (
                      <div className='block'>
                        <textarea
                          defaultValue={disNameArray[item][0].title}
                          className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-xl font-bold'
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
                        className='text-2xl font-bold p-2 rounded-lg m-2 hover:bg-red-400 hover:text-white'
                        onClick={() => setClickTitle(!clickTitle)}
                      >
                        {disNameArray[item][0].title} <br />
                      </button>
                    )}

                    <hr className='border border-red-600' />
                    {/* Get - toDo - in toDosArray */}
                    {clickToDo ? (
                      <div className='block'>
                        <textarea
                          className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-xl font-bold'
                          defaultValue={disNameArray[item][0].toDo}
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
                        className='text-xl font-bold p-2 rounded-lg m-2 hover:bg-red-400 hover:text-white '
                        onClick={() => setClickToDo(!clickToDo)}
                      >
                        {disNameArray[item][0].toDo} <br />{' '}
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
          {/* Nested toDoList in Parent toDoID and in current Parent URL pathname */}
          <div
            className='justify-center text-2xl bg-white rounded-xl m-2 hover:bg-red-600 hover:text-white shadow-inner'
            key={index}
          >
            {user?.username === disNameArray[item][ind].displayName &&
            checkTODOID &&
            setToDoSArray ? (
              <Link
                to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
                key={item.id}
              >
                {' '}
                <div
                  className='text-3xl font-bold pb-4 pr-4 pl-4 pt-4'
                  key={item.id}
                >
                  {disNameArray[item][ind].title} <br key={item.id} />
                </div>
                <hr
                  className='border border-red-600 ml-4 mr-4 m-2'
                  key={item.id}
                />
                <div className='text-2xl pb-4 pr-4 pl-4 pt-4' key={item.id}>
                  {disNameArray[item][ind].toDo} <br key={item.id} />
                </div>
                {` `}
              </Link>
            ) : null}
          </div>
        </div>
      );
    });
  });
};
