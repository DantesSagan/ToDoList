import React from 'react';
import { formatTime } from '../../indexConst';
import DeadLine from './mainComponents/deadLine';
import NoDeadLine from './mainComponents/noDeadLine';
import UntilDead from './mainComponents/untilDead';

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

     
      // console.log(
      //   disNameArray[item][ind].untilTime === '2022-06-01' ||
      //     disNameArray[item][ind].untilTime < '2022-06-01'
      //     ? console.log('wasted')
      //     : disNameArray[item][ind].untilTime === 0
      //     ? console.log('equal to zero')
      //     : console.log('display')
      // );
      return (
        <div className='dashboardPage' key={index.id}>
          {/*
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser
          And additionally checking if current route path strict-equal to toDoID
        */}
          {/* Nested toDoList in Parent toDoID and in current Parent URL pathname */}
          <div
            className='justify-center text-1xl rounded-xl mt-2 hover:bg-red-600 hover:text-white bg-white rounded-xl hover:bg-red-600 shadow-inner'
            key={index}
          >
            {/* <div key={index}>{nestedDo}</div> */}
            {user?.username === disNameArray[item][ind].displayName &&
            checkTODOID ? (
              <div>
                {disNameArray[item][ind].untilTime === formatTime() ||
                disNameArray[item][ind].untilTime < formatTime() ? (
                  <DeadLine
                    disNameArray={disNameArray}
                    item={item}
                    ind={ind}
                    formatTime={formatTime}
                  />
                ) : disNameArray[item][ind].untilTime === 0 ? (
                  <NoDeadLine
                    disNameArray={disNameArray}
                    item={item}
                    ind={ind}
                  />
                ) : (
                  <UntilDead
                    disNameArray={disNameArray}
                    item={item}
                    ind={ind}
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  });
}
