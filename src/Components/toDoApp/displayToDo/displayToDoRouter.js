/* eslint-disable react-hooks/exhaustive-deps */
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseLib } from '../../../firebaseLibrary/firebaseLib';
import { getNestedToDo, nestedDoc } from '../../../services/firebase';

export const DisplayTodoByID = ({
  toDosArray,
  user,
  // deleteToDo,
  // title,
  // setTitle,
  // toDo,
  // setToDo,
  // editToDoList,
  // editTitle,
  setToDoSArray,
}) => {
  // const [clickTitle, setClickTitle] = useState(false);
  // const [clickToDo, setClickToDo] = useState(false);

  const [nestedArrayToDo, setNestedArrayToDo] = useState([]);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  useEffect(() => {
    const checkNestedToDo = () => {
      return Object.keys(disNameArray).map((item) => {
        // Get - disNameArray[item] - and nested indexes within it for each result of its callback
        return Object.keys(disNameArray[item]).map((ind) => {
          return getNestedToDo(disNameArray, item, ind, setNestedArrayToDo);
        });
      });
    };
    checkNestedToDo();
  }, []);
  const nestedToDoArray = Object.keys(nestedArrayToDo).map((item) => {
    return nestedArrayToDo[item].toDosArray;
  });
  console.log(nestedToDoArray, '21');

  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  const MainObj = Object.keys(disNameArray).map((item, index) => {
    console.log(toDosArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    return Object.keys(disNameArray[item]).map((ind) => {
      // this is comparison for checking pathname of url from link to this page
      // and comparison with toDoID for receiving data from Firebase
      let currentUrl = window.location.pathname;
      let todoURL = `/todolist/${disNameArray[item][0].toDoID}`;
      let checkTODOID = currentUrl === todoURL;

      return (
        <div className='' key={index}>
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
            {/* <div key={index}>{nestedDo}</div> */}
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

  const nest =
    // 1st
    Object.keys(disNameArray).map((item) => {
      // Get - disNameArray[item] - and nested indexes within it for each result of its callback
      // 2nd
      return Object.keys(disNameArray[item]).map((ind) => {
        let currentUrl = window.location.pathname;
        let todoURL = `/todolist/${disNameArray[item][ind].toDoID}`;
        let checkTODOID = currentUrl === todoURL;
        console.log(checkTODOID);
        // 3d
        return Object.keys(nestedToDoArray).map((items) => {
          console.log(nestedArrayToDo);
          //  4th
          return Object.keys(nestedToDoArray[items]).map((index) => {
            console.log(nestedToDoArray[items][index].toDo);
            // JSX nested todo
            return (
              <div key={items.id}>
                {/* without check */}
                <div key={items.id}>
                  {/* with check especially toDoId pathname and username */}
                  {checkTODOID &&
                  user?.username === nestedToDoArray[items][index].displayName
                    ? nestedToDoArray[items][index].toDo
                    : null}
                </div>
              </div>
            );
          });
        });
      });
    });

  // For now subcollection will calling only with console.log???
  // And again it's displaying nested subcollection when was call
  // Need to fix that and reveal it on permanent display like parent toDoArray and forchild too === done
  return (
    <div>
      {MainObj}
      <div>{nest}1</div>
    </div>
  );
};
