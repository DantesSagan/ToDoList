import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToDo from './add-to-do';
import {formatDistance} from 'date-fns';
export default function ToDo({
  docId,
  toDosAdditional: toDoS,
  posted,
  toDoTextArea,
}) {
  const [toDosAdditional, setToDosAdditional] = useState(toDoS);
  const [commentsSlice, setcommentsSlice] = useState(3);

  const showNextComments = () => {
    setcommentsSlice(commentsSlice + 5);
  };
  return (
    <div>
      <div>
        {toDosAdditional.slice(0, commentsSlice).map((item) => (
          <p key={`${item.toDo}-${item.displayName}`}>
            <Link to={`p/${item.displayName}`}>
              <span>{item.displayName}</span>
            </Link>
            <span>{item.toDo}</span>
          </p>
        ))}
        {toDosAdditional.length >= 3 && commentsSlice < toDosAdditional.length && (
          <button
            className='text-sm text-gray-base mb-1 cursor-pointer'
            type='button'
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments();
              }
            }}
          >
            Show more comments
          </button>
        )}
        <p className='text-gray-base uppercase text-xs mt-2'>
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddToDo
        docId={docId}
        toDosAdditional={toDosAdditional}
        toDoTextArea={toDoTextArea}
        setToDosAdditional={setToDosAdditional}
      />
    </div>
  );
}
ToDo.propTypes = {
  docId: PropTypes.string.isRequired,
  toDosAdditional: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  toDoTextArea: PropTypes.object.isRequired,
};
