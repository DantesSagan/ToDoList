// import { addDoc } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
// import FirebaseContext from '../../context/firebaseContext';
// import UserContext from '../../context/user';

import PropTypes from 'prop-types';

export default function AddToDoTwo() {
  const [userInput, setUserInput] = useState('');
  const [title, setTitle] = useState('');

  const [toDos, setToDoS] = useState([]);

  const itemsArray = userInput.split(',');
  const itemsArrayTitle = title.split(',');

  const items = toDos.map((x) => <div className='p-2'>{x}</div>);
  const itemsTitle = toDos.map((x) => <h1 className='p-2'>{x}</h1>);

  // const { firebaseLib, FieldValue } = useContext(FirebaseContext);
  // const {
  //   user: { displayName },
  // } = useContext(UserContext);

  // const addTodo = document.querySelector('.add');

  // const handleSubmitToDo = (event) => {
  //   event.preventDefault();

  //   addDoc(firebaseLib, {
  //     title: addTodo.title.value,
  //     userInput: addTodo.userInput.value,
  //   }).then(() => {
  //     addTodo.reset();
  //   });

  //   setToDoS([...toDos, { displayName, userInput }]);
  //   setUserInput('');

  //   return firebaseLib
  //     .firestore()
  //     .collection('todos')
  //     .doc()
  //     .update({
  //       toDos: FieldValue.arrayUnion({ displayName, userInput }),
  //     });
  // };

  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl '>
            <form
              className='block justify-between pl-0 pr-5 hover:bg-black '
              // method='POST'
              // onSubmit={(event) =>
              //   userInput.length >= 1
              //     ? handleSubmitToDo(event)
              //     : event.preventDefault()
              // }
            >
              <textarea
                aria-label='Add a comment'
                autoComplete='off'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4'
                type='text'
                name='add-comment'
                placeholder='Заголовок задачи...'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              >
                {itemsTitle}
              </textarea>
              <textarea
                aria-label='Add a comment'
                autoComplete='off'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4'
                type='text'
                name='add-comment'
                placeholder='Напишите задачу...'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                // ref={toDoTextArea}
              />
            </form>
            <div className='transform hover:rotate-0 transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'>
              <button
                className={`w-full h-full text-sm font-bold text-white ${
                  !userInput && !title && 'opacity-25'
                }`}
                type='button'
                disabled={userInput.length < 1 && title.length < 1}
                onClick={() => setToDoS([itemsArrayTitle, itemsArray])}
              >
                Добавить задачу
              </button>
            </div>
            <form className='justrify-center text-2xl border-2 border-red-600 pl-0 pr-5 bg-gray-300'>
              <ul className='p-4'>{items}</ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
  //     <div className='flex flex-col w-2/4'>
  //       <div className='flex flex-col items-center'>
  //         <div className='h-full w-full py-5 px-4 text-xl '>
  //           <textarea onChange={(e) => setTitle(e.target.value)} />
  //           <textarea
  //             className='flex flex-col w-4/5'
  //             onChange={(e) => setUserInput(e.target.value)}
  //             placeholder='Separate items with commas'
  //           />
  //           <br />
  //           <button
  //             className='bg-black hover:bg-red-600 text-white rounded-lg h-8 font-bold'
  //             onClick={() => setToDoS(itemsArray, titleItems)}
  //           >
  //             Create List
  //           </button>
  //           <h1 className='p-4'>My "To Do" List:</h1>
  //           <h1>{title}</h1>
  //           <ul className='p-4'>{items}</ul>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
// AddToDoTwo.propTypes = {
//   toDosAdditional: PropTypes.array.isRequired,
//   userInput: PropTypes.string.isRequired,
//   toDoTextArea: PropTypes.object.isRequired,
// };
