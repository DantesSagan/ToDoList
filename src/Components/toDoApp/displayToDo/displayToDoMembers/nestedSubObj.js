import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../../indexConst';

export default function NestedSubObj({
  disNameArray,
  nestedToDoArray,
  user,
  arrayID,
}) {
  // getting nested subcollection toDo from the same router path in a parent toDo
  //   1st
  return Object.keys(disNameArray).map((item) => {
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    // 2nd
    // 3d
    return Object.keys(nestedToDoArray).map((itemsNested) => {
      // console.log(nestedArrayToDo);
      //  4th
      // console.log(nestedToDoArray, '27');

      // Check if parent toDoID is equal to current window.location.pathname of URL
      // And if it true so display current nestedToDo in subcollection
      let currentUrl = window.location.pathname;
      let todoURL = `/todolist/${nestedToDoArray[itemsNested].toDosArray.parentID}`;
      let checkTODOID = currentUrl === todoURL;

      // Check subcollection nestedToDo document ID and comparison it with
      // nestedToDo subcollection toDoID
      let checkNestedID =
        arrayID[itemsNested] === nestedToDoArray[itemsNested].toDosArray.toDoID;
      // Check current authentication user in provider data and comparison with
      // nestedToDo displayName
      //  in - subcollection - toDo
      //  in - parent - toDo
      let checkName =
        user?.username === nestedToDoArray[itemsNested].toDosArray.displayName;

      // Check parentID of toDo which stored in array toDo
      // and  comparison it with subcollection data where stored parentID
      let checkParentID =
        disNameArray[item].toDosArray.toDoID ===
        nestedToDoArray[itemsNested].toDosArray.parentID;

      // console.log('docidPARENT=>', toDoDOC[indDoc]);
      // console.log(' checkTODOID =>', checkTODOID);
      // console.log('   checkNestedID =>', checkNestedID);
      // console.log('   checkName =>', checkName);
      // console.log('   checkParentID =>', checkParentID);
      return (
        <div
          className='justify-center text-1xl rounded-xl mt-2 hover:bg-red-600 hover:text-white dashboardPage bg-white rounded-xl hover:bg-red-600 '
          key={itemsNested.id}
        >
          {/* with check especially toDoId pathname and username */}
          {checkName && checkNestedID && checkParentID && checkTODOID ? (
            <div>
              {nestedToDoArray[itemsNested].toDosArray.untilTime ===
                formatTime() ||
              nestedToDoArray[itemsNested].toDosArray.untilTime <
                formatTime() ? (
                <Link
                  to={`/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`}
                >
                  <div className='text-1xl p-4 m-2'>
                    Задание просрочено! <br />
                    Срок:
                    <span className='bg-red-500 rounded-lg'>
                      {nestedToDoArray[itemsNested].toDosArray.untilTime}
                    </span>{' '}
                    {` `} до, включительно {formatTime()}
                  </div>
                </Link>
              ) : nestedToDoArray[itemsNested].toDosArray.untilTime === 0 ? (
                <Link
                  to={`/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`}
                  key={item.id}
                >
                  <div className='grid grid-rows-1 grid-flow-col gap-4'>
                    <div className='text-1xl p-2' key={itemsNested.id}>
                      {' '}
                      {nestedToDoArray[itemsNested].toDosArray.doneToDo ? (
                        <s className='opacity-50 ml-5'>
                          {nestedToDoArray[itemsNested].toDosArray.toDo}{' '}
                        </s>
                      ) : (
                        <div className='ml-5'>
                          {nestedToDoArray[itemsNested].toDosArray.toDo}
                        </div>
                      )}
                    </div>
                    <div
                      id='flags'
                      className='m-auto p-2  rounded-lg transition duration-300'
                    >
                      <section className='inline-block'>
                        <button className='buttonM dropdown text-white'>
                          {nestedToDoArray[itemsNested].toDosArray
                            .importance ? (
                            <div>
                              {nestedToDoArray[itemsNested].toDosArray
                                .importance[0] === 'red' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='red'
                                  viewBox='0 0 24 24'
                                  stroke='black'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : nestedToDoArray[itemsNested].toDosArray
                                  .importance[0] === 'green' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='green'
                                  viewBox='0 0 24 24'
                                  stroke='black'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : nestedToDoArray[itemsNested].toDosArray
                                  .importance[0] === 'gray' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='gray'
                                  viewBox='0 0 24 24'
                                  stroke='black'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : nestedToDoArray[itemsNested].toDosArray
                                  .importance[0] === 'white' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='white'
                                  viewBox='0 0 24 24'
                                  stroke='gray'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : (
                                <div> Importance </div>
                              )}
                            </div>
                          ) : null}
                        </button>
                      </section>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`}
                  key={item.id}
                >
                  <div className='grid grid-rows-1 grid-flow-col gap-4 '>
                    <div className='text-1xl p-2' key={itemsNested.id}>
                      {' '}
                      {nestedToDoArray[itemsNested].toDosArray.doneToDo ? (
                        <s className='opacity-50 ml-5'>
                          {nestedToDoArray[itemsNested].toDosArray.toDo}{' '}
                        </s>
                      ) : (
                        <div className='ml-5'>
                          {nestedToDoArray[itemsNested].toDosArray.toDo}
                        </div>
                      )}
                    </div>
                    <div
                      id='flags'
                      className='m-auto p-2  rounded-lg transition duration-300'
                    >
                      <section className='inline-block'>
                        <button className='buttonM dropdown text-white'>
                          {nestedToDoArray[itemsNested].toDosArray
                            .importance ? (
                            <div>
                              {nestedToDoArray[itemsNested].toDosArray
                                .importance[0] === 'red' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='red'
                                  viewBox='0 0 24 24'
                                  stroke='black'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : nestedToDoArray[itemsNested].toDosArray
                                  .importance[0] === 'green' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='green'
                                  viewBox='0 0 24 24'
                                  stroke='black'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : nestedToDoArray[itemsNested].toDosArray
                                  .importance[0] === 'gray' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='gray'
                                  viewBox='0 0 24 24'
                                  stroke='black'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : nestedToDoArray[itemsNested].toDosArray
                                  .importance[0] === 'white' ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-12 w-12 svg'
                                  fill='white'
                                  viewBox='0 0 24 24'
                                  stroke='gray'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                                  />
                                </svg>
                              ) : (
                                <div> Importance </div>
                              )}
                            </div>
                          ) : null}
                        </button>
                      </section>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ) : null}
        </div>
      );
    });
  });
}
