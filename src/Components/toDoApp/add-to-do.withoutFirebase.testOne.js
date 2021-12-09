/* eslint-disable react-hooks/exhaustive-deps */
// import { addDoc } from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/user';

import PropTypes from 'prop-types';

export default function AddToDoTwo() {
  const [toDo, setToDo] = useState('');
  const [title, setTitle] = useState('');

  const [toDosArray, setToDoSArray] = useState([]);

  // const toDoSplit = toDo.split(',');
  // const titleSplit = title.split(',');

  // const items = toDosArray.map((x) => <div className='p-2'>{x}</div>);
  // const itemsTitle = toDosArray.map((x) => <h1 className='p-2'>{x}</h1>);

  const { firebaseLib, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  useEffect(() => {
    firebaseLib
      .firestore()
      .collection('todos')
      .onSnapshot((serverUpdate) => {
        const todolist = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(todolist);
        setToDoSArray({
          todolist: todolist,
        });
      });
  }, []);

  const handleSubmitToDo = (event) => {
    event.preventDefault();

    setToDoSArray([...toDo, { displayName, title, toDo }]);
    setToDo('');

    return firebaseLib
      .firestore()
      .collection('todos')
      .doc('todoList')
      .update({
        toDosArray: FieldValue.arrayUnion({
          displayName,
          title,
          toDo,
        }),
      });
  };
  console.log(toDosArray);

  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl '>
            <form
              className='block justify-between pl-0 pr-5 hover:bg-black '
              method='POST'
              onSubmit={(event) =>
                toDo.length >= 1
                  ? handleSubmitToDo(event)
                  : event.preventDefault()
              }
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
              />
              <textarea
                aria-label='Add a comment'
                autoComplete='off'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4'
                type='text'
                name='add-comment'
                placeholder='Напишите задачу...'
                value={toDo}
                onChange={(e) => setToDo(e.target.value)}
                // ref={toDoTextArea}
              />
            </form>
            <div className='transform hover:rotate-0 transition duration-300 bg-black text-white hover:bg-red-600 rounded-lg p-2 m-2'>
              <button
                className={`w-full h-full text-sm font-bold text-white ${
                  !toDo && !title && 'opacity-25'
                }`}
                type='button'
                disabled={toDo.length < 1 && title.length < 1}
                // onClick={() => setToDoS([itemsArrayTitle, itemsArray])}
                onClick={handleSubmitToDo}
              >
                Добавить задачу
              </button>
            </div>
            <form className='justrify-center text-2xl border-2 border-red-600 pl-0 pr-5 bg-gray-300'>
              <div className='p-4'>{title}</div>
              <ul className='p-4'>{toDo}</ul>
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
