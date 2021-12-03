import React, { useState } from 'react';

export default function DashboardToDo() {
  const [userInput, setUserInput] = useState('');
  const [toDo, setToDo] = useState([]);
  const itemsArray = userInput.split(',');
  const items = toDo.map((x) => <li className='p-2'>{x}</li>);
  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl '>
            <textarea
              className='flex flex-col w-4/5'
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Separate items with commas'
            />
            <br />
            <button onClick={() => setToDo(itemsArray)}>Create List</button>
            <h1>My "To Do" List:</h1>
            <ul className='p-4'>{items}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
