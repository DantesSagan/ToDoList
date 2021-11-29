import React, { useState } from 'react';

export default function AppMain() {
  const [userInput, setUserInput] = useState('');
  const [toDo, setToDo] = useState([]);
  const itemsArray = userInput.split(',');
  const items = toDo.map((x) => <li>{x}</li>);
  return (
    <div>
      <textarea
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: '235px', margin: '5px' }}
        placeholder='Separate items with commas'
      />
      <br />
      <button onClick={() => setToDo(itemsArray)}>Create List</button>
      <h1>My "To Do" List:</h1>
      <ul
        style={{
          textAlign: 'center',
          alignContent: 'center',
          marginLeft: '600px',
          marginRight: '600px',
        }}
      >
        {items}
      </ul>
    </div>
  );
}
