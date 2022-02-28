import React from 'react';
import { Link } from 'react-router-dom';

export default function NestedSubObj({
  disNameArray,
  nestedToDoArray,
  user,
  arrayID,
}) {
  const formatTime = () => {
    let date = new Date();
    // Year part from the timestamp
    let year = date.getFullYear();
    // Month part from the timestamp
    let month = date.getMonth() + 1;
    // Days part from the timestamp
    let days = date.getDate();

    let months = 10 || 11 || 12;

    // Will display time in 10:30:23 format
    let formattedTime = `${year}-0${month}-${days}`;
    let formattedTimeSecond = `${year}-${month}-${days}`;
    return formattedTimeSecond === `${year}-${months}-${days}`
      ? `${year}-${month.toString().slice(-2)}-${days}`
      : formattedTime;
  };
  
  // getting nested subcollection toDo from the same router path in a parent toDo
  //   1st
  return Object.keys(disNameArray).map((item) => {
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    // 2nd
    return Object.keys(disNameArray[item]).map((ind) => {
      // 3d
      return Object.keys(nestedToDoArray).map((itemsNested) => {
        // console.log(nestedArrayToDo);
        //  4th
        return Object.keys(nestedToDoArray[itemsNested]).map((index) => {
          // console.log(nestedToDoArray, '27');

          // Check if parent toDoID is equal to current window.location.pathname of URL
          // And if it true so display current nestedToDo in subcollection
          let currentUrl = window.location.pathname;
          let todoURL = `/todolist/${disNameArray[item][ind].toDoID}`;
          let checkTODOID = currentUrl === todoURL;

          // Check subcollection nestedToDo document ID and comparison it with
          // nestedToDo subcollection toDoID
          let checkNestedID =
            arrayID[itemsNested] === nestedToDoArray[itemsNested][index].toDoID;

          // Check current authentication user in provider data and comparison with
          // nestedToDo displayName
          //  in - subcollection - toDo
          //  in - parent - toDo
          let checkName =
            user?.username === nestedToDoArray[itemsNested][index].displayName;

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
                <div>
                  {nestedToDoArray[itemsNested][index].untilTime ===
                    formatTime() ||
                  nestedToDoArray[itemsNested][index].untilTime <
                    formatTime() ? (
                    <Link
                      to={`/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`}
                    >
                      <div className='text-1xl p-4 m-2'>
                        Задание просрочено! <br />
                        Срок:
                        <span className='bg-red-500 rounded-lg'>
                          {nestedToDoArray[itemsNested][index].untilTime}
                        </span>{' '}
                        {` `} до, включительно {formatTime()}
                      </div>
                    </Link>
                  ) : nestedToDoArray[itemsNested][index].untilTime === 0 ? (
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
                          <s className='opacity-50 ml-5'>
                            {nestedToDoArray[itemsNested][index].toDo}{' '}
                          </s>
                        ) : (
                          <div className='ml-5'>
                            {nestedToDoArray[itemsNested][index].toDo}
                          </div>
                        )}
                        <br key={item.id} />
                      </div>
                      {` `}
                    </Link>
                  ) : (
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
                          <s className='opacity-50 ml-5'>
                            {nestedToDoArray[itemsNested][index].toDo}{' '}
                          </s>
                        ) : (
                          <div className='ml-5'>
                            {nestedToDoArray[itemsNested][index].toDo}
                          </div>
                        )}
                        <br key={item.id} />
                      </div>
                      {` `}
                    </Link>
                  )}
                </div>
              ) : null}
            </div>
          );
        });
      });
    });
  });
}
