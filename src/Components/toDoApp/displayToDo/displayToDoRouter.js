/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNestedToDo } from '../../../services/firebase';

export default function DisplayTodoByID({
  toDosArray,
  user,
  nestedArrayToDo,
  setNestedArrayToDo,
  arrayID,
  setArrayID,
}) {
  // const [clickTitle, setClickTitle] = useState(false);
  // const [clickToDo, setClickToDo] = useState(false);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  const nestedToDoArray = Object.keys(nestedArrayToDo).map((item) => {
    return nestedArrayToDo[item].toDosArray;
  });

  // Problem was in nested scope object function
  // And getNestedToDo doesn't invoke nestedToDo
  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID);
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
  }, []);


  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  const MainObj = Object.keys(disNameArray).map((item, index) => {
    // console.log(toDosArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    return Object.keys(disNameArray[item]).map((ind) => {
      // this is comparison for checking pathname of url from link to this page
      // and comparison with toDoID for receiving data from Firebase
      let currentUrl = window.location.pathname;
      let todoURL = `/todolist/${disNameArray[item][ind].toDoID}`;
      let checkTODOID = currentUrl === todoURL;
      return (
        <div className='' key={index.id}>
          {/*
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser
          And additionally checking if current route path strict-equal to toDoID
        */}
          {/* Nested toDoList in Parent toDoID and in current Parent URL pathname */}
          <div
            className='justify-center text-1xl rounded-xl mt-2 hover:bg-red-600 hover:text-white'
            key={index}
            style={{ width: '600px' }}
          >
            {/* <div key={index}>{nestedDo}</div> */}
            {user?.username === disNameArray[item][ind].displayName &&
            checkTODOID ? (
              <Link
                to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
                key={item.id}
                // onClick={() =>
                //   window.open(
                //     todoURL,
                //     'targetWindow',
                //     `toolbar=no,
                //                     location=no,
                //                     status=no,
                //                     menubar=no,
                //                     scrollbars=yes,
                //                     resizable=yes,
                //                     width=800px,
                //                     height=800px`
                //   )
                // }
              >
                <div
                  className='text-3xl font-bold p-4 hover:underline title'
                  key={item.id}
                >
                  {disNameArray[item][ind].title} <br key={item.id} />
                </div>
                <hr
                  className='border border-red-600 ml-4 mr-4 m-2'
                  key={item.id}
                />
                <div className='text-1xl p-4 hover:underline' key={item.id}>
                  {disNameArray[item][ind].doneToDo ? (
                    <s className='opacity-50'>{disNameArray[item][ind].toDo}</s>
                  ) : (
                    <div>{disNameArray[item][ind].toDo}</div>
                  )}
                  <br key={item.id} />
                </div>
                {` `}
              </Link>
            ) : null}
          </div>
        </div>
      );
    });
  });

  // getting nested subcollection toDo from the same router path in a parent toDo
  const Nest =
    // 1st
    Object.keys(disNameArray).map((item) => {
      // Get - disNameArray[item] - and nested indexes within it for each result of its callback
      // 2nd
      return Object.keys(disNameArray[item]).map((ind) => {
        // 3d
        return Object.keys(nestedToDoArray).map((itemsNested) => {
          // console.log(nestedArrayToDo);
          //  4th
          return Object.keys(nestedToDoArray[itemsNested]).map((index) => {
            console.log(nestedToDoArray, '27');

            // Check if parent toDoID is equal to current window.location.pathname of URL
            // And if it true so display current nestedToDo in subcollection
            let currentUrl = window.location.pathname;
            let todoURL = `/todolist/${disNameArray[item][ind].toDoID}`;
            let checkTODOID = currentUrl === todoURL;

            // Check subcollection nestedToDo document ID and comparison it with
            // nestedToDo subcollection toDoID
            let checkNestedID =
              arrayID[itemsNested] ===
              nestedToDoArray[itemsNested][index].toDoID;

            // Check current authentication user in provider data and comparison with
            // nestedToDo displayName
            //  in - subcollection - toDo
            //  in - parent - toDo
            let checkName =
              user?.username ===
              nestedToDoArray[itemsNested][index].displayName;

            // Check parentID of toDo which stored in array toDo
            // and  comparison it with subcollection data where stored parentID
            let checkParentID =
              disNameArray[item][ind].toDoID ===
              nestedToDoArray[itemsNested][index].parentID;

            // console.log('docidPARENT=>', toDoDOC[indDoc]);
            // console.log(' checkTODOID =>', checkTODOID);
            // console.log('   checkNestedID =>', checkNestedID);
            // console.log('   checkName =>', checkName);
            // console.log('   checkParentID =>', checkParentID);
            return (
              <div
                className='justify-center text-1xl rounded-xl mt-2 hover:bg-red-600 hover:text-white'
                key={itemsNested.id}
              >
                {/* with check especially toDoId pathname and username */}
                {checkName && checkNestedID && checkParentID && checkTODOID ? (
                  <Link
                    to={`/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`}
                    key={item.id}
                  >
                    <hr
                      className='border border-red-600 ml-4 mr-4 m-2'
                      key={item.id}
                    />
                    <div
                      className='text-1xl p-2 ml-2 hover:underline'
                      key={item.id}
                    >
                      {nestedToDoArray[itemsNested][index].doneToDo ? (
                        <s className='opacity-50'>
                          {nestedToDoArray[itemsNested][index].toDo}{' '}
                        </s>
                      ) : (
                        <div>{nestedToDoArray[itemsNested][index].toDo}</div>
                      )}
                      <br key={item.id} />
                    </div>
                    {` `}
                  </Link>
                ) : null}
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
    <div className='border-l-2 border-solid border-red-600 rounded-xl'>
      {MainObj}
      {Nest}
    </div>
  );
}

DisplayTodoByID.propTypes = {
  nestedArrayToDo: PropTypes.array.isRequired,
  nestedToDoArray: PropTypes.object.isRequired,
};
