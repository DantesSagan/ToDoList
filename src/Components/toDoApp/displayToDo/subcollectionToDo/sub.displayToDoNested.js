import { useState } from 'react';
import { firebaseLib } from '../../../../firebaseLibrary/firebaseLib';
import GetChangeDate from '../../nestedToDo/toDoMembers/getChangeDate';
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
  setNestedArrayToDo,
  arrayID,
  setArrayID,
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
              className='justrify-center text-2xl border-l-2 border-red-600 pl-0 pr-5 rounded-xl border-r-2 shadow-inner'
              key={index}
              style={{ width: '600px' }}
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
                <div className='m-8 p-4  rounded-lg'>
                  {/* Delete toDo by toDoID */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 cursor-pointer stroke ml-auto flex'
                    fill='black'
                    viewBox='0 0 24 24'
                    stroke='black'
                    onClick={deleteSubToDo}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                  {/* 
                    By default state - true - and if you clicking on a title of a toDoList 
                    state will changed to false and you will see textarea,
                     where you can change you title of current toDo
                    */}

                  <hr className='border-b-2 border-red-600' />

                  {/* Get - toDo - in toDosArray */}
                  {/* Check to completed toDo */}
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='pt-4 col-span-2 ml-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 cursor-pointer border-2 border-solid border-black rounded-2xl hover:bg-gray-300 '
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        onClick={handleDoneToDoSub}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                    <div className='col-span-1'>
                      {clickToDo ? (
                        <div className='block'>
                          <textarea
                            className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-xl font-bold'
                            defaultValue={
                              nestedToDoArray[itemsNested][index].toDo
                            }
                            onChange={(e) => setToDo(e.target.value)}
                          />
                          <button
                            className={`block p-2 bg-green-600 w-2/5 h-full m-2 text-white hover:bg-green-400 rounded-lg ${
                              !toDo && 'opacity-25'
                            }`}
                            onClick={editSubToDo}
                          >
                            Edit Sub ToDo
                          </button>
                          <button
                            className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
                            onClick={() => setClickToDo(!clickToDo)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className='text-1xl font-bold rounded-lg m-2 mt-4 hover:bg-red-400 hover:text-white border-l-2 border-red-600'
                          onClick={() => setClickToDo(!clickToDo)}
                        >
                          {nestedToDoArray[itemsNested][index].doneToDo !==
                          doneToDo ? (
                            <s className='opacity-50'>
                              {nestedToDoArray[itemsNested][index].toDo}
                            </s>
                          ) : (
                            <div
                              className='pl-2 hover:underline'
                              key={itemsNested.id}
                            >
                              {nestedToDoArray[itemsNested][index].toDo}{' '}
                              <br key={itemsNested.id} />
                            </div>
                          )}{' '}
                          <br />{' '}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Get - createdAt - in toDosArray */}
                  <div className='text-sm m-2 mt-4 font-bold'>
                    {nestedToDoArray[itemsNested][index].createdAt} <br />
                  </div>
                  <div className='text-sm font-bold p-2 border border-ted-400'>
                    Until this time -{' '}
                    {nestedToDoArray[itemsNested][index].untilTime}
                    <br />
                  </div>
                  {/* Change deadline data */}
                  <br />
                  <div className='border-2 border-red-600 p-2 rounded-lg shadow-inner'>
                    {/* Hidded button and if you click you will see deadline change button */}
                    {changeDate ? (
                      <div>
                        <label htmlFor='until'>Change deadline!</label>
                        <input
                          className='text-2xl p-2 ml-4   border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 pb-2 rounded-lg hover:text-white'
                          onChange={(e) => setUntilTime(e.target.value)}
                          type='date'
                          id='until'
                          name='trip-start'
                          value={untilTime}
                          min='2021-12-31'
                          max='2078-12-31'
                        />
                        <br />
                        <button
                          onClick={(event) => handleSubStamp(event)}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Change date
                        </button>{' '}
                        <button
                          onClick={() => setChangeDate(!changeDate)}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={handleSubZeroStamp}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Without deadline
                        </button>
                        <button
                          onClick={() => setChangeDate(!changeDate)}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Change deadline!
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Get - displayName - in toDosArray */}
                  <div className='text-sm font-bold underline m-2 '>
                    {nestedToDoArray[itemsNested][index].displayName} <br />
                  </div>
                </div>
              ) : (
                <div className='m-8 p-4  rounded-lg'>
                  {/* Delete toDo by toDoID */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 cursor-pointer stroke ml-auto flex'
                    fill='black'
                    viewBox='0 0 24 24'
                    stroke='black'
                    onClick={deleteSubToDo}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                  {/* 
                        By default state - true - and if you clicking on a title of a toDoList 
                        state will changed to false and you will see textarea,
                         where you can change you title of current toDo
                        */}

                  <hr className='border-b-2 border-red-600' />

                  {/* Get - toDo - in toDosArray */}
                  {/* Check to completed toDo */}
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='pt-4 col-span-2 ml-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 cursor-pointer border-2 border-solid border-black rounded-2xl hover:bg-gray-300 '
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        onClick={handleDoneToDoSub}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                    <div className='col-span-1'>
                      {clickToDo ? (
                        <div className='block'>
                          <textarea
                            className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-xl font-bold'
                            defaultValue={
                              nestedToDoArray[itemsNested][index].toDo
                            }
                            onChange={(e) => setToDo(e.target.value)}
                          />
                          <button
                            className={`block p-2 bg-green-600 w-2/5 h-full m-2 text-white hover:bg-green-400 rounded-lg ${
                              !toDo && 'opacity-25'
                            }`}
                            onClick={editSubToDo}
                          >
                            Edit Sub ToDo
                          </button>
                          <button
                            className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
                            onClick={() => setClickToDo(!clickToDo)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className='text-1xl font-bold rounded-lg m-2 mt-4 hover:bg-red-400 hover:text-white border-l-2 border-red-600'
                          onClick={() => setClickToDo(!clickToDo)}
                        >
                          {nestedToDoArray[itemsNested][index].doneToDo !==
                          doneToDo ? (
                            <s className='opacity-50'>
                              {nestedToDoArray[itemsNested][index].toDo}
                            </s>
                          ) : (
                            <div
                              className='pl-2 hover:underline'
                              key={itemsNested.id}
                            >
                              {nestedToDoArray[itemsNested][index].toDo}{' '}
                              <br key={itemsNested.id} />
                            </div>
                          )}{' '}
                          <br />{' '}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Get - createdAt - in toDosArray */}
                  <div className='text-sm m-2 mt-4 font-bold'>
                    {nestedToDoArray[itemsNested][index].createdAt} <br />
                  </div>
                  <div className='text-sm font-bold p-2 border border-ted-400'>
                    Until this time -{' '}
                    {nestedToDoArray[itemsNested][index].untilTime}
                    <br />
                  </div>
                  {/* Change deadline data */}
                  <br />
                  <div className='border-2 border-red-600 p-2 rounded-lg shadow-inner'>
                    {/* Hidded button and if you click you will see deadline change button */}
                    {changeDate ? (
                      <div>
                        <label htmlFor='until'>Change deadline!</label>
                        <input
                          className='text-2xl p-2 ml-4   border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 pb-2 rounded-lg hover:text-white'
                          onChange={(e) => setUntilTime(e.target.value)}
                          type='date'
                          id='until'
                          name='trip-start'
                          value={untilTime}
                          min='2021-12-31'
                          max='2078-12-31'
                        />
                        <br />
                        <button
                          onClick={(event) => handleSubStamp(event)}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Change date
                        </button>{' '}
                        <button
                          onClick={() => setChangeDate(!changeDate)}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={handleSubZeroStamp}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Without deadline
                        </button>
                        <button
                          onClick={() => setChangeDate(!changeDate)}
                          className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
                        >
                          Change deadline!
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Get - displayName - in toDosArray */}
                  <div className='text-sm font-bold underline m-2 '>
                    {nestedToDoArray[itemsNested][index].displayName} <br />
                  </div>
                </div>
              )}
            </form>
          ) : null}
        </div>
      );
    });
  });
};
