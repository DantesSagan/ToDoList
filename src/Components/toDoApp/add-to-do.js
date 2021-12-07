import React, { useState, useContext } from 'react';
// import FirebaseContext from '../../context/firebaseContext';
// import UserContext from '../../context/user';

// import PropTypes from 'prop-types';

export default function AddToDo() {
  const [userInput, setUserInput] = useState('');
  const [toDos, setToDo] = useState([]);
  const itemsArray = userInput.split(',');
  const items = toDos.map((x) => <li className='p-2'>{x}</li>);
  // const { firebaseLib, FieldValue } = useContext(FirebaseContext);
  // const {
  //   user: { toDo },
  // } = useContext(UserContext);

  // const handleSubmitToDo = (event) => {
  //   event.preventDefault();
  //   setUserInput([...toDosAdditional, { toDo, userInput }]);
  //   setUserInput('');

  //   return firebaseLib
  //     .firestore()
  //     .collection('todos')
  //     .doc(docId)
  //     .update({
  //       toDosAdditional: FieldValue.arrayUnion({ toDo, userInput }),
  //     });

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
            <button
              className='bg-black hover:bg-red-600 text-white rounded-lg h-8 font-bold'
              onClick={() => setToDo(itemsArray)}
            >
              Create List
            </button>
            <h1>My "To Do" List:</h1>
            <ul className='p-4'>{items}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
