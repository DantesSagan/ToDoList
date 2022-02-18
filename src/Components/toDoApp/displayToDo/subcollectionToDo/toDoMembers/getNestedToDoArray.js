export default function GetNestedToDoArray({
  deleteSubToDo,
  handleDoneToDoSub,
  handleSubStamp,
  handleSubZeroStamp,
  clickToDo,
  nestedToDoArray,
  itemsNested,
  index,
  setToDo,
  toDo,
  editSubToDo,
  setClickToDo,
  changeDate,
  setChangeDate,
  doneToDo,
  setUntilTime,
  untilTime,
}) {
  return (
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
                defaultValue={nestedToDoArray[itemsNested][index].toDo}
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
              {nestedToDoArray[itemsNested][index].doneToDo !== doneToDo ? (
                <s className='opacity-50'>
                  {nestedToDoArray[itemsNested][index].toDo}
                </s>
              ) : (
                <div className='pl-2 pr-2 hover:underline' key={itemsNested.id}>
                  <ul>{nestedToDoArray[itemsNested][index].toDo} </ul>
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
        Until this time - {nestedToDoArray[itemsNested][index].untilTime}
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
  );
}