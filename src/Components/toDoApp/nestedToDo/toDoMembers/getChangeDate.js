import React from 'react';

export default function GetChangeDate({
  changeDate,
  setUntilTime,
  untilTime,
  handleStamp,
  setChangeDate,
  handleZeroStamp,
}) {
  return (
    <div className='p-4 rounded-lg'>
      Wasted!
      <br />
      {changeDate ? (
        <div className='p-4'>
          <input
            className='text-2xl mb-2 p-2 border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 pb-2 rounded-lg hover:text-white'
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
            onClick={(event) => handleStamp(event)}
            className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
          >
            Change date
          </button>
          <button
            onClick={() => setChangeDate(!changeDate)}
            className='p-2 rounded-lg bg-red-600 text-white hover:bg-red-400'
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleZeroStamp}
            className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
          >
            Without deadline
          </button>
          <label htmlFor='until'>
            <button
              onClick={() => setChangeDate(!changeDate)}
              className='p-2 rounded-lg bg-black text-white hover:bg-white hover:border-2 hover:border-red-600 border-2 hover:text-black'
            >
              Change deadline!
            </button>
          </label>
        </div>
      )}
    </div>
  );
}
