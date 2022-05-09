import { useState } from 'react';
import { firebaseLib } from '../../../firebaseLibrary/firebaseLib';
import { formatTime } from '../indexConst';
import RedFlag from './toDoMembers/flags/flag.red';
import GetChangeDate from './toDoMembers/getChangeDate';
import GetNestedToDo from './toDoMembers/getNestedToDo';
import HandleStampToDo from './toDoMembers/handleChangeTimeStamp';
import HandleDoneToDo from './toDoMembers/handleDoneToDo';
import HandleZeroStamp from './toDoMembers/handleZeroStamp';

export const DisplayTodoByIDNESTED = ({
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
  const [doneToDo, setDoneToDo] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  // Deadline value
  const [untilTime, setUntilTime] = useState(Number);
  // Flags - importance
  const colorsArray = ['red', 'green', 'gray', 'white'];
  const [flags, setFlags] = useState(colorsArray);
  const [colors, setColors] = useState('');

  const disNameArray = toDosArray;

  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  return Object.keys(disNameArray).map((item, index) => {
    // console.log(disNameArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    // this is comparison for checking pathname of url from link to this page
    // and comparison with toDoID for receiving data from Firebase
    let currentUrl = window.location.pathname;
    let todoNestedURL = `/todolist/nested/${disNameArray[item].toDosArray.toDoID}`;
    let checkTODOID = currentUrl === todoNestedURL;

    // console.log(checkTODOID);
    // console.log(disNameArray[item]);

    // console.log(disNameArray[item].toDosArray.doneToDo);

    const { handleStamp } = HandleStampToDo({
      untilTime,
      setUntilTime,
      firebaseLib,
      disNameArray,
      item,
    });
    const { handleDoneToDo } = HandleDoneToDo({
      setDoneToDo,
      doneToDo,
      firebaseLib,
      disNameArray,
      item,
    });
    const { handleZeroStamp } = HandleZeroStamp({
      untilTime,
      setUntilTime,
      firebaseLib,
      disNameArray,
      item,
    });

    const { redFlagToDoList } = RedFlag({
      setToDoSArray,
      toDosArray,
      firebaseLib,
      colors,
    });

    return (
      <div className='' key={index}>
        {/* 
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser 
          And additionally checking if current route path strict-equal to toDoID
          */}
        {user?.username === disNameArray[item].toDosArray.displayName
          ? checkTODOID &&
            setToDoSArray && (
              <form
                method='POST'
                className='justrify-center text-2xl border-l-4 border-r-4 border-red-600 pl-0 pr-5 rounded-xl  shadow-inner dashboardPage  bg-white rounded-xl  hover:border-white transition duration-300'
                onSubmit={(event) => handleStamp(event)}
                key={index}
              >
                {disNameArray[item].toDosArray.untilTime === formatTime() ||
                disNameArray[item].toDosArray.untilTime < formatTime() ? (
                  // This is component for getting form to changed you deadline
                  // If you time of deadline is out
                  <GetChangeDate
                    changeDate={changeDate}
                    setChangeDate={setChangeDate}
                    setUntilTime={setUntilTime}
                    untilTime={untilTime}
                    handleStamp={handleStamp}
                    handleZeroStamp={handleZeroStamp}
                  />
                ) : disNameArray[item].toDosArray.untilTime === 0 ? (
                  // This is component for getting nested to do with all functionalities
                  // This component will displayed only if untilTime parameter strict-equal to 0
                  // This is means no deadlines
                  <GetNestedToDo
                    setChangeDate={setChangeDate}
                    setUntilTime={setUntilTime}
                    setTitle={setTitle}
                    setClickTitle={setClickTitle}
                    setClickToDo={setClickToDo}
                    setToDo={setToDo}
                    setDoneToDo={setDoneToDo}
                    deleteToDo={deleteToDo}
                    handleDoneToDo={handleDoneToDo}
                    handleZeroStamp={handleZeroStamp}
                    editToDoList={editToDoList}
                    editTitle={editTitle}
                    handleStamp={handleStamp}
                    clickTitle={clickTitle}
                    clickToDo={clickToDo}
                    untilTime={untilTime}
                    changeDate={changeDate}
                    title={title}
                    toDo={toDo}
                    doneToDo={doneToDo}
                    disNameArray={disNameArray}
                    item={item}
                    redFlagToDoList={redFlagToDoList}
                    flags={flags}
                    setFlags={setFlags}
                    colors={colors}
                    setColors={setColors}
                  />
                ) : (
                  // This is component for getting nested to do with all functionalities
                  // This component displayed by default
                  <GetNestedToDo
                    setChangeDate={setChangeDate}
                    setUntilTime={setUntilTime}
                    setTitle={setTitle}
                    setClickTitle={setClickTitle}
                    setClickToDo={setClickToDo}
                    setToDo={setToDo}
                    setDoneToDo={setDoneToDo}
                    deleteToDo={deleteToDo}
                    handleDoneToDo={handleDoneToDo}
                    handleZeroStamp={handleZeroStamp}
                    editToDoList={editToDoList}
                    editTitle={editTitle}
                    handleStamp={handleStamp}
                    clickTitle={clickTitle}
                    clickToDo={clickToDo}
                    untilTime={untilTime}
                    changeDate={changeDate}
                    doneToDo={doneToDo}
                    title={title}
                    toDo={toDo}
                    disNameArray={disNameArray}
                    item={item}
                    redFlagToDoList={redFlagToDoList}
                    flags={flags}
                    setFlags={setFlags}
                    colors={colors}
                    setColors={setColors}
                  />
                )}
              </form>
            )
          : null}
      </div>
    );
  });
};
