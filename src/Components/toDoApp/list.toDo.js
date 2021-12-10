import React from 'react';

export default function ListOfToDo({ toDosArray }) {
  return (
    <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
      {toDosArray.map((item, index) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={index}>
          <div>
            {item.toDosArray.map((itemOne, index) => (
              <div className='text-2xl font-bold p-2' key={index}>
                {itemOne.title}
              </div>
            ))}
          </div>
          <hr className='border border-red-600' />
          <div>
            {item.toDosArray.map((itemTwo, index) => (
              <div className='text-xl ' key={index}>
                {itemTwo.toDo}
              </div>
            ))}
          </div>
          <div>
            {item.toDosArray.map((itemThree, index) => (
              <div className='text-lg' key={index}>
                {itemThree.createdAt}
              </div>
            ))}
          </div>
          {/* <div key={item}>
                    {item.toDosArray.map((itemFour) => (
                      <div key={itemFour.displayName}>{itemFour.displayName}</div>
                    ))}
                  </div> */}
        </div>
      ))}
    </form>
  );
}
