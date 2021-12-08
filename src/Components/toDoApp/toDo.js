import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToDo from './add-to-do';
import { formatDistance } from 'date-fns';
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
