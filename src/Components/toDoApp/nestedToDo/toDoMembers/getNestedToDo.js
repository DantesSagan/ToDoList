import React, { useEffect, useState } from 'react';
import IndexDeadLine from './deadlineData';
import IndexHeader from './headerEditToDo';
import IndexTasks from './taskData';

export default function GetNestedToDo({
  setUntilTime,
  untilTime,
  deleteToDo,
  clickTitle,
  title,
  setTitle,
  editTitle,
  setClickTitle,
  setClickToDo,
  disNameArray,
  item,
  ind,
  toDo,
  setToDo,
  clickToDo,
  editToDoList,
  doneToDo,
  handleDoneToDo,
  handleStamp,
  changeDate,
  setChangeDate,
  handleZeroStamp,
  setDoneToDo,
  redFlagToDoList,
  flags,
  setFlags,
  colors,
  setColors,
}) {
  const [array, setArray] = useState([]);
  const [submit, setSubmit] = useState(true);
  // console.log(
  //   disNameArray[item].toDosArray.doneToDo !== doneToDo
  //     ? console.log('Not a toDo')
  //     : console.log('ToDo by defalt')
  // );
  // console.log(disNameArray[item].toDosArray.toDo instanceof Array);

  // const toDoArray = [];
  // const nestedToDoUL = Object.keys(disNameArray).map((toDoIndex) => {
  //   return toDoArray.push(disNameArray[item].toDosArray.toDo[toDoIndex]);
  // });

  const HandleConfirm = (color) => {
    return (
      <div>
        {submit ? (
          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                array.push(color);
                redFlagToDoList();
                console.log('Color red with existed importance');
              }}
            >
              yes
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                console.log('Color canceled');
                setSubmit(!submit);
                return null;
              }}
            >
              no
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                console.log('Color canceled');
                setSubmit(!submit);
                return null;
              }}
            ></button>
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    async function SendColors() {
      const response = await setColors(array);
      return response;
    }
    SendColors();
  }, []);

  return (
    <div className='p-4 rounded-lg h-full '>
      {/* Delete toDo by toDoID */}
      <IndexHeader
        disNameArray={disNameArray}
        item={item}
        flags={flags}
        array={array}
        redFlagToDoList={redFlagToDoList}
        colors={colors}
        deleteToDo={deleteToDo}
      />

      {/* Get - title - in toDosArray */}
      {/* 
                By default state - true - and if you clicking on a title of a toDoList 
                state will changed to false and you will see textarea,
                 where you can change you title of current toDo
                */}
      {clickTitle ? (
        <div className='block'>
          <textarea
            defaultValue={disNameArray[item].toDosArray.title}
            className='text-sm text-gray-base w-full mr-3 m-3 py-5 px-4 rounded-lg font-bold '
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className={`block p-2 bg-green-600 w-2/5 h-full m-2 text-white hover:bg-green-400 rounded-lg ${
              !title && 'opacity-25'
            }`}
            onClick={editTitle}
          >
            EditTitle
          </button>
          <button
            className='block p-2 bg-red-600 rounded-lg w-2/5 h-full m-2 text-white hover:bg-red-400'
            onClick={() => setClickTitle(!clickTitle)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className='text-3xl font-bold p-2 rounded-lg m-2 hover:bg-red-400 hover:text-white title'
          onClick={() => setClickTitle(!clickTitle)}
        >
          <div className='grid grid-rows-1 grid-flow-col gap-4'>
            <div
              className='text-3xl font-bold p-4 title col-span-3'
              key={item.id}
            >
              {disNameArray[item].toDosArray.title}{' '}
            </div>
          </div>
        </button>
      )}
      <hr className='border border-red-600' id='hrr' />
      {/* Get - toDo - in toDosArray */}
      {/* Check to completed toDo */}
      <div className='pt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 cursor-pointer border-2 border-solid border-black rounded-2xl hover:bg-gray-300'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          onClick={handleDoneToDo}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 13l4 4L19 7'
          />
        </svg>
      </div>
      <IndexTasks
        disNameArray={disNameArray}
        item={item}
        clickToDo={clickToDo}
        setToDo={setToDo}
        toDo={toDo}
        editToDoList={editToDoList}
        setClickToDo={setClickToDo}
        doneToDo={doneToDo}
      />

      {/* Get - createdAt - in toDosArray */}
      <div className='text-sm font-bold p-2'>
        {disNameArray[item].toDosArray.createdAt} <br />
      </div>
      <div className='text-sm font-bold p-2 border border-ted-400'>
        Until this time - {disNameArray[item].toDosArray.untilTime}
        <br />
      </div>
      {/* Change deadline data */}
      <br />
      <IndexDeadLine
        changeDate={changeDate}
        setUntilTime={setUntilTime}
        untilTime={untilTime}
        handleStamp={handleStamp}
        setChangeDate={setChangeDate}
        handleZeroStamp={handleZeroStamp}
      />
      {/* Get - displayName - in toDosArray */}
      <div className='text-sm font-bold p-2 underline'>
        {disNameArray[item].toDosArray.displayName} <br />
      </div>
    </div>
  );
}
