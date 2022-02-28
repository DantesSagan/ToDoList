import { Link } from 'react-router-dom';
import React from 'react';

export default function NestMainToDo({ disNameArray, user }) {
  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  return Object.keys(disNameArray).map((item, index) => {
    // console.log(toDosArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    return Object.keys(disNameArray[item]).map((ind) => {
      // this is comparison for checking pathname of url from link to this page
      // and comparison with toDoID for receiving data from Firebase
      let currentUrl = window.location.pathname;
      let todoURL = `/todolist/${disNameArray[item][ind].toDoID}`;
      let checkTODOID = currentUrl === todoURL;

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
      // console.log(
      //   disNameArray[item][ind].untilTime === '2022-06-01' ||
      //     disNameArray[item][ind].untilTime < '2022-06-01'
      //     ? console.log('wasted')
      //     : disNameArray[item][ind].untilTime === 0
      //     ? console.log('equal to zero')
      //     : console.log('display')
      // );
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
              <div>
                {disNameArray[item][ind].untilTime === formatTime() ||
                disNameArray[item][ind].untilTime < formatTime() ? (
                  <Link
                    to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
                  >
                    <div className='text-3xl p-4 m-2'>
                      Задание просрочено! <br />
                      Срок:
                      <span className='bg-red-500 rounded-lg'>
                        {disNameArray[item][ind].untilTime}
                      </span>{' '}
                      {` `}до, включительно {formatTime()}
                    </div>
                  </Link>
                ) : disNameArray[item][ind].untilTime === 0 ? (
                  <Link
                    to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
                    key={item.id}
                  >
                    <div
                      className='text-3xl font-bold p-2 ml-4 mr-4 hover:underline title'
                      key={item.id}
                    >
                      {disNameArray[item][ind].title} <br key={item.id} />
                    </div>
                    <hr
                      className='border border-red-600 ml-4 mr-4 '
                      key={item.id}
                    />
                    <div
                      className='text-1xl p-2 ml-2 hover:underline'
                      key={item.id}
                    >
                      {disNameArray[item][ind].doneToDo ? (
                        <s className='opacity-50 ml-5'>
                          {disNameArray[item][ind].toDo}
                        </s>
                      ) : (
                        <div className='ml-5'>
                          {disNameArray[item][ind].toDo}
                        </div>
                      )}
                      <br key={item.id} />
                    </div>
                    {` `}
                  </Link>
                ) : (
                  <Link
                    to={`/todolist/nested/${disNameArray[item][ind].toDoID}`}
                    key={item.id}
                  >
                    <div
                      className='text-3xl font-bold p-2 ml-4 mr-4 hover:underline title'
                      key={item.id}
                    >
                      {disNameArray[item][ind].title} <br key={item.id} />
                    </div>
                    <hr
                      className='border border-red-600 ml-4 mr-4 '
                      key={item.id}
                    />
                    <div
                      className='text-1xl p-2 ml-2 hover:underline'
                      key={item.id}
                    >
                      {disNameArray[item][ind].doneToDo ? (
                        <s className='opacity-50 ml-5'>
                          <div className='ml-5'>
                            {disNameArray[item][ind].toDo instanceof Array ? (
                              <ul>
                                {Object.keys(disNameArray[item][ind].toDo).map(
                                  (toDoIndex) => {
                                    return (
                                      <li className='p-1 hover:underline'>
                                        {
                                          disNameArray[item][ind].toDo[
                                            toDoIndex
                                          ]
                                        }{' '}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              disNameArray[item][ind].toDo
                            )}
                          </div>
                        </s>
                      ) : (
                        <div className='ml-5'>
                          {disNameArray[item][ind].toDo instanceof Array ? (
                            <ul>
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
                      )}
                      <br key={item.id} />
                    </div>
                    {` `}
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  });
}
