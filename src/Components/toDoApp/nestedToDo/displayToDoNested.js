import { useState } from 'react';
import { firebaseLib } from '../../../firebaseLibrary/firebaseLib';
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
  const [untilTime, setUntilTime] = useState(Number);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  return Object.keys(disNameArray).map((item, index) => {
    console.log(disNameArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    return Object.keys(disNameArray[item]).map((ind) => {
      // this is comparison for checking pathname of url from link to this page
      // and comparison with toDoID for receiving data from Firebase
      let currentUrl = window.location.pathname;
      let todoNestedURL = `/todolist/nested/${disNameArray[item][ind].toDoID}`;
      let checkTODOID = currentUrl === todoNestedURL;

      console.log(checkTODOID);
      console.log(disNameArray[item]);

      console.log(disNameArray[item][ind].doneToDo);

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

      const { handleStamp } = HandleStampToDo({
        untilTime,
        setUntilTime,
        firebaseLib,
        disNameArray,
        item,
        ind,
      });
      const { handleDoneToDo } = HandleDoneToDo({
        setDoneToDo,
        doneToDo,
        firebaseLib,
        disNameArray,
        item,
        ind,
      });
      const { handleZeroStamp } = HandleZeroStamp({
        untilTime,
        setUntilTime,
        firebaseLib,
        disNameArray,
        item,
        ind,
      });
      return (
        <div className='' key={index}>
          {/* 
          Check if user is logged in and strict-equlity to ref in toDo displayName
          And finally display it what strict-equal to currentAuthUser 
          And additionally checking if current route path strict-equal to toDoID
          */}
          {user?.username === disNameArray[item][ind].displayName
            ? checkTODOID &&
              setToDoSArray && (
                <form
                  method='POST'
                  className='justrify-center text-2xl border-l-2 border-r-2 border-red-600 pl-0 pr-5 rounded-xl  shadow-inner'
                  onSubmit={(event) => handleStamp(event)}
                  key={index}
                >
                  {disNameArray[item][ind].untilTime === formatTime() ||
                  disNameArray[item][ind].untilTime < formatTime() ? (
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
                  ) : disNameArray[item][ind].untilTime === 0 ? (
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
                      ind={ind}
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
                      ind={ind}
                    />
                  )}
                </form>
              )
            : null}
        </div>
      );
    });
  });
};
