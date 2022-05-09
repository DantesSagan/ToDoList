import { useState, useTransition } from 'react';
import { firebaseLib } from '../../../../firebaseLibrary/firebaseLib';
import { formatTime } from '../../indexConst';
import FlagsSub from './actions/flags';
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
  setNestedArrayToDo,
  setArrayID,
  flags,
  setFlags,
  colors,
  setColors,
  handleSubFlags,
}) => {
  const [isPending, startTransition] = useTransition();

  // const [clickTitle, setClickTitle] = useState(false);
  const [clickToDo, setClickToDo] = useState(false);
  const [doneToDo, setDoneToDo] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  // Deadline value
  const [untilTime, setUntilTime] = useState(Number);
  // Flags - importance

  const nestedToDoArray = nestedArrayToDo;

  return Object.keys(nestedToDoArray).map((itemsNested) => {
    // console.log(nestedArrayToDo);
    //  4th
    // console.log(nestedToDoArray, '27');


    const { handleDoneToDoSub } = HandleDoneSubToDo({
      setDoneToDo,
      doneToDo,
      firebaseLib,
      nestedToDoArray,
      itemsNested,
      startTransition,
    });

    const { handleSubStamp } = HandleSubStampToDo({
      untilTime,
      setUntilTime,
      firebaseLib,
      nestedToDoArray,
      itemsNested,
    });

    const { handleSubZeroStamp } = HandleSubZeroStamp({
      untilTime,
      setUntilTime,
      firebaseLib,
      nestedToDoArray,
      itemsNested,
    });

    // Check if parent toDoID is equal to current window.location.pathname of URL
    // And if it true so display current nestedToDo in subcollection
    let currentUrl = window.location.pathname;
    let todoURL = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested].toDosArray.toDoID}`;
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

    // console.log('docidPARENT=>', toDoDOC[indDoc]);
    // console.log(' checkTODOID =>', checkTODOID);
    // console.log('   checkNestedID =>', checkNestedID);
    // console.log('   checkName =>', checkName);
    // console.log('   checkParentID =>', checkParentID);

    return (
      <div>
        {/* 
              Check if user is logged in and strict-equlity to ref in toDo displayName
              And finally display it what strict-equal to currentAuthUser 
              And additionally checking if current route path strict-equal to toDoID
              */}
        {checkTODOID && checkNestedID && checkName ? (
          <form
            method='POST'
            className='justrify-center text-2xl border-l-4 border-red-600 pl-0 pr-5 rounded-xl border-r-4 shadow-inner dashboardPage  bg-white rounded-xl  hover:border-white transition duration-300'
          >
            {nestedToDoArray[itemsNested].toDosArray.untilTime ===
              formatTime() ||
            nestedToDoArray[itemsNested].toDosArray.untilTime < formatTime() ? (
              <GetSubChangeDate
                changeDate={changeDate}
                setChangeDate={setChangeDate}
                setUntilTime={setUntilTime}
                untilTime={untilTime}
                handleSubStamp={handleSubStamp}
                handleSubZeroStamp={handleSubZeroStamp}
              />
            ) : nestedToDoArray[itemsNested].toDosArray.untilTime === 0 ? (
              <GetNestedToDoArray
                deleteSubToDo={deleteSubToDo}
                handleDoneToDoSub={handleDoneToDoSub}
                handleSubStamp={handleSubStamp}
                handleSubZeroStamp={handleSubZeroStamp}
                clickToDo={clickToDo}
                nestedToDoArray={nestedToDoArray}
                itemsNested={itemsNested}
                setToDo={setToDo}
                toDo={toDo}
                editSubToDo={editSubToDo}
                setClickToDo={setClickToDo}
                changeDate={changeDate}
                setChangeDate={setChangeDate}
                doneToDo={doneToDo}
                setUntilTime={setUntilTime}
                untilTime={untilTime}
                handleSubFlags={handleSubFlags}
                flags={flags}
                setFlags={setFlags}
                colors={colors}
                setColors={setColors}
                isPending={isPending}
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
                setToDo={setToDo}
                toDo={toDo}
                editSubToDo={editSubToDo}
                setClickToDo={setClickToDo}
                changeDate={changeDate}
                setChangeDate={setChangeDate}
                doneToDo={doneToDo}
                setUntilTime={setUntilTime}
                untilTime={untilTime}
                handleSubFlags={handleSubFlags}
                flags={flags}
                setFlags={setFlags}
                colors={colors}
                setColors={setColors}
                isPending={isPending}
              />
            )}
          </form>
        ) : null}
      </div>
    );
  });
};
