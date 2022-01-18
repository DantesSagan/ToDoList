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
          {/* Nested toDoList in Parent toDoID and in current Parent URL pathname */}
          <div
            className='justify-center text-2xl bg-white rounded-xl m-2 hover:bg-red-600 hover:text-white shadow-inner'
            key={index}
          >
            {user?.username === disNameArray[item][ind].displayName &&
            checkTODOID &&
            setToDoSArray ? (
              <div>
                <Link
                  to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
                  key={item.id}
                >
                  <div className='text-3xl font-bold text-black pb-4 pr-4 pl-4 pt-4'>{`ToDoList page ${disNameArray[item][ind].toDoID}`}</div>{' '}
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
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  });
};
