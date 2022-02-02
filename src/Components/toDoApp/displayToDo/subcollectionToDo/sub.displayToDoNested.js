import { useState } from 'react';
import { firebaseLib } from '../../../../firebaseLibrary/firebaseLib';
import HandleDoneSubToDo from './toDoMembers/handleDoneToDo';

export const DisplayTodoByIDNESTED = ({
  toDosArray,
  user,
  deleteToDo,
  title,
  setTitle,
  toDo,
  setToDo,
  editToDoList,
  editTitle,
  setToDoSArray,
  nestedArrayToDo,
  setNestedArrayToDo,
  arrayID,
  setArrayID,
}) => {
  // const [clickTitle, setClickTitle] = useState(false);
  const [clickToDo, setClickToDo] = useState(false);

  const [doneToDo, setDoneToDo] = useState(false);

  const disNameArray = Object.keys(toDosArray).map((item) => {
    return toDosArray[item].toDosArray;
  });

  const nestedToDoArray = Object.keys(nestedArrayToDo).map((item) => {
    return nestedArrayToDo[item].toDosArray;
  });
  //  Get - toDosArray - in toDosArray - yep it's seem's like pointless but it work's
  return Object.keys(disNameArray).map((item, index) => {
    console.log(disNameArray);
    // Get - disNameArray[item] - and nested indexes within it for each result of its callback
    return Object.keys(disNameArray[item]).map((ind) => {
      // this is comparison for checking pathname of url from link to this page
      // and comparison with toDoID for receiving data from Firebase
      let currentUrl = window.location.pathname;
      let todoNestedURL = `/todolist/nested/${disNameArray[item][ind].toDoID}`;
      let checkTODOID = currentUrl === todoNestedURL;

      console.log(checkTODOID);
      console.log(disNameArray[item]);

      console.log(disNameArray[item][ind].doneToDo);

      const { handleDoneToDo } = HandleDoneSubToDo({
        setDoneToDo,
        doneToDo,
        firebaseLib,
        disNameArray,
        item,
        ind,
      });
      return Object.keys(nestedToDoArray).map((itemsNested) => {
        // console.log(nestedArrayToDo);
        //  4th
        return Object.keys(nestedToDoArray[itemsNested]).map((index) => {
          console.log(nestedToDoArray, '27');

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

          // Check parentID of toDo which stored in array toDo
          // and  comparison it with subcollection data where stored parentID
          let checkParentID =
            disNameArray[item][ind].toDoID ===
            nestedToDoArray[itemsNested][index].parentID;

          // console.log('docidPARENT=>', toDoDOC[indDoc]);
          // console.log(' checkTODOID =>', checkTODOID);
          // console.log('   checkNestedID =>', checkNestedID);
          // console.log('   checkName =>', checkName);
          // console.log('   checkParentID =>', checkParentID);
          return (
            <div className='pt-2' key={index}>
              {/* 
              Check if user is logged in and strict-equlity to ref in toDo displayName
              And finally display it what strict-equal to currentAuthUser 
              And additionally checking if current route path strict-equal to toDoID
              */}
              {checkTODOID && checkNestedID && checkName && checkParentID ? (
                <form
                  method='POST'
                  className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl '
                  key={index}
                >
                  <div className='m-8 p-4 shadow-inner rounded-lg'>
                    {/* Delete toDo by toDoID */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8 cursor-pointer stroke'
                      fill='black'
                      viewBox='0 0 24 24'
                      stroke='black'
                      onClick={deleteToDo}
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

                    <hr className='border border-red-600' />
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
                          onClick={editToDoList}
                        >
                          EditToDo
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
                        {nestedToDoArray[itemsNested][index].doneToDo ||
                        doneToDo ? (
                          <s className='opacity-50'>
                            {nestedToDoArray[itemsNested][index].toDo}
                          </s>
                        ) : (
                          <div
                            className='p-2 hover:underline'
                            key={item.id}
                          >
                            {nestedToDoArray[itemsNested][index].toDo}{' '}
                            <br key={item.id} />
                          </div>
                        )}{' '}
                        <br />{' '}
                      </button>
                    )}

                    {/* Get - createdAt - in toDosArray */}
                    <div className='text-sm'>
                      {nestedToDoArray[itemsNested][index].createdAt} <br />
                    </div>
                    {/* Get - displayName - in toDosArray */}
                    <div className='text-sm font-bold p-2 underline'>
                      {nestedToDoArray[itemsNested][index].displayName} <br />
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
          );
        });
      });
    });
  });
};
