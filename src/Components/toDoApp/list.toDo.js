import PropTypes from 'prop-types';
import React from 'react';
export default function ListOfToDo({ toDosArray }) {
  return (
    <form className='justrify-center text-2xl border border-red-300 pl-0 pr-5 bg-white rounded-xl'>
      {toDosArray.map((item, index) => (
        <div className='m-4 p-4 shadow-inner rounded-lg' key={index}>
          {item.toDosArray.map((second) => (
            <div key={index}>
              <div className='text-2xl font-bold p-2'>{second?.title}</div>
              <hr className='border border-red-600' />
              <div className='text-xl'>{second?.toDo}</div>
              <div className='text-lg'>{second?.createdAt}</div>
              <div className='text-sm font-bold p-2 underline'>
                {second?.displayName}
              </div>
            </div>
          ))}
        </div>
      ))}
    </form>
  );
}
ListOfToDo.propTypes = {
  toDosArray: PropTypes.array.isRequired,
};
