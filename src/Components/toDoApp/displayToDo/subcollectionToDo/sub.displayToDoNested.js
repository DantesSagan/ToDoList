import { useState } from 'react';
import { firebaseLib } from '../../../../firebaseLibrary/firebaseLib';
import GetNestedToDoArray from './toDoMembers/getNestedToDoArray';
import GetSubChangeDate from './toDoMembers/getSubChangeDate';
import HandleDoneSubToDo from './toDoMembers/handleDoneToDo';
import HandleSubStampToDo from './toDoMembers/handleSubChangeTimeStamp';
import HandleSubZeroStamp from './toDoMembers/handleSubZeroStamp';

export const DisplayTodoByIDNESTED = ({
  user,
  deleteSubToDo,
  toDo,
  setToDo,
  editSubToDo,
  nestedArrayToDo,
  arrayID,
}) => {
  // const [clickTitle, setClickTitle] = useState(false);
  const [clickToDo, setClickToDo] = useState(false);
  const [doneToDo, setDoneToDo] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  const [untilTime, setUntilTime] = useState(Number);

  const nestedToDoArray = Object.keys(nestedArrayToDo).map((item) => {
    return nestedArrayToDo[item].toDosArray;
  });

  return Object.keys(nestedToDoArray).map((itemsNested) => {
    // console.log(nestedArrayToDo);
    //  4th
    return Object.keys(nestedToDoArray[itemsNested]).map((index) => {
      // console.log(nestedToDoArray, '27');

      const formatTime = () => {
        let date = new Date();
        // Year part from the timestamp
        let year = date.getFullYear();
        // Month part from the timestamp
        let month =
          date.getMonth() + 1 === 10 || 11 || 12
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
        // Days part from the timestamp
        let days =
          date.getDate() === 10 ||
          11 ||
          12 ||
          13 ||
          14 ||
          15 ||
          16 ||
          17 ||
          18 ||
          19 ||
          20 ||
          21 ||
          22 ||
          23 ||
          24 ||
          25 ||
          26 ||
          27 ||
          28 ||
          29 ||
          30 ||
          31
            ? `${date.getDate()}`
            : date.getDate()
            ? `0${date.getDate()}`
            : date.getDate();

        // Will display time in 2022-10-03 || 2077-03-20 format
        let formattedTime = `${year}-${month}-${days}`;

        console.log(formattedTime);
        return formattedTime;
      };

      const { handleDoneToDoSub } = HandleDoneSubToDo({
        setDoneToDo,
        doneToDo,
        firebaseLib,
        nestedToDoArray,
        itemsNested,
        index,
      });

      const { handleSubStamp } = HandleSubStampToDo({
        untilTime,
        setUntilTime,
        firebaseLib,
        nestedToDoArray,
        itemsNested,
        index,
      });

      const { handleSubZeroStamp } = HandleSubZeroStamp({
        untilTime,
        setUntilTime,
        firebaseLib,
        nestedToDoArray,
        itemsNested,
        index,
      });

      // Check if parent toDoID is equal to current window.location.pathname of URL
      // And if it true so display current nestedToDo in subcollection
      let currentUrl = window.location.pathname;
      let todoURL = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`;
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

      // console.log('docidPARENT=>', toDoDOC[indDoc]);
      // console.log(' checkTODOID =>', checkTODOID);
      // console.log('   checkNestedID =>', checkNestedID);
      // console.log('   checkName =>', checkName);
      // console.log('   checkParentID =>', checkParentID);
      return (
        <div key={index}>
          {/* 
              Check if user is logged in and strict-equlity to ref in toDo displayName
              And finally display it what strict-equal to currentAuthUser 
              And additionally checking if current route path strict-equal to toDoID
              */}
          {checkTODOID && checkNestedID && checkName ? (
            <form
              method='POST'
              className='justrify-center text-2xl border-l-4 border-red-600 pl-0 pr-5 rounded-xl border-r-4 shadow-inner dashboardPage  bg-white rounded-xl  hover:border-4 hover:border-white'
              key={index}
            >
              {nestedToDoArray[itemsNested][index].untilTime === formatTime() ||
              nestedToDoArray[itemsNested][index].untilTime < formatTime() ? (
                <GetSubChangeDate
                  changeDate={changeDate}
                  setChangeDate={setChangeDate}
                  setUntilTime={setUntilTime}
                  untilTime={untilTime}
                  handleSubStamp={handleSubStamp}
                  handleSubZeroStamp={handleSubZeroStamp}
                />
              ) : nestedToDoArray[itemsNested][index].untilTime === 0 ? (
                <GetNestedToDoArray
                  deleteSubToDo={deleteSubToDo}
                  handleDoneToDoSub={handleDoneToDoSub}
                  handleSubStamp={handleSubStamp}
                  handleSubZeroStamp={handleSubZeroStamp}
                  clickToDo={clickToDo}
                  nestedToDoArray={nestedToDoArray}
                  itemsNested={itemsNested}
                  index={index}
                  setToDo={setToDo}
                  toDo={toDo}
                  editSubToDo={editSubToDo}
                  setClickToDo={setClickToDo}
                  changeDate={changeDate}
                  setChangeDate={setChangeDate}
                  doneToDo={doneToDo}
                  setUntilTime={setUntilTime}
                  untilTime={untilTime}
                />
              ) : (
                <GetNestedToDoArray
                  deleteSubToDo={deleteSubToDo}
                  handleDoneToDoSub={handleDoneToDoSub}
                  handleSubStamp={handleSubStamp}
                  handleSubZeroStamp={handleSubZeroStamp}
                  clickToDo={clickToDo}
                  nestedToDoArray={nestedToDoArray}
                  itemsNested={itemsNested}
                  index={index}
                  setToDo={setToDo}
                  toDo={toDo}
                  editSubToDo={editSubToDo}
                  setClickToDo={setClickToDo}
                  changeDate={changeDate}
                  setChangeDate={setChangeDate}
                  doneToDo={doneToDo}
                  setUntilTime={setUntilTime}
                  untilTime={untilTime}
                />
              )}
            </form>
          ) : null}
        </div>
      );
    });
  });
};
