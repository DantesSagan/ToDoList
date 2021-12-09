import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/user';

import PropTypes from 'prop-types';

export default function AddToDo({
  docId,
  toDosAdditional,
  setToDosAdditional,
  toDoTextArea,
}) {
  const [userInput, setUserInput] = useState('');
  // const [title, setTitle] = useState('');
  // const [toDos, setToDoS] = useState([]);

  // const itemsArray = userInput.split(',');

  // const titleItems = toDos.map((x) => <h1 className='p-2'>{x}</h1>);
  const { firebaseLib, FieldValue } = useContext(FirebaseContext);

  useEffect(() => {
    async function getToDoS(todo) {
      const result = await firebaseLib
        .firestore()
        .collection('todos')
        .where('userId', 'in', todo)
        .get();

      const getDo = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
      }));
      return getDo;
    }
    getToDoS();
  }, []);

  const {
    user: { title },
  } = useContext(UserContext);

  const handleSubmitToDo = (event) => {
    event.preventDefault();
    setToDosAdditional([...toDosAdditional, { title, userInput }]);
    setUserInput('');

    return firebaseLib
      .firestore()
      .collection('todos')
      .doc(docId)
      .update({
        toDosAdditional: FieldValue.arrayUnion({ title, userInput }),
      });
  };
  // const items = toDosAdditional.map((x) => <li className='p-2'>{x}</li>);
  return (
    <div className='container flex mx-auto max-w-screen-sm item-center justify-center'>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center'>
          <div className='h-full w-full py-5 px-4 text-xl '>
            <form
              className='flex justify-between pl-0 pr-5'
              method='POST'
              onSubmit={(event) =>
                userInput.length >= 1
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
                placeholder='Напишите задачу...'
                value={userInput}
                onChange={({ target }) => setUserInput(target.value)}
                ref={toDoTextArea}
              />
              <div className='transform hover: rotate-0 transition duration-300'>
                <button
                  className={`w-full h-full text-sm font-bold text-red-medium ${
                    !userInput && 'opacity-25'
                  }`}
                  type='button'
                  disabled={userInput.length < 1}
                  onClick={handleSubmitToDo}
                >
                  Добавить задачу
                </button>
              </div>
              {/* <ul className='p-4'>{items}</ul> */}
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
AddToDo.propTypes = {
  toDosAdditional: PropTypes.array.isRequired,
  userInput: PropTypes.string.isRequired,
  toDoTextArea: PropTypes.object.isRequired,
};
