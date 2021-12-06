import React, { useState } from 'react';
import AddToDo from './add-to-do';
import PropTypes from 'prop-types';

export default function DashboardToDo({
  docId,
  toDosAdditional: toDo,
  // posted,
  commentInput,
}) {
  const [toDosAdditional, settoDosAdditional] = useState(toDo);

  return (
    <div>
      {/* <p className='text-black uppercase text-sm mt-2'>
        {format}
      </p> */}
      <AddToDo
        docId={docId}
        userInput={toDosAdditional}
        setUserInput={settoDosAdditional}
        commentInput={commentInput}
      />
    </div>
  );
}
DashboardToDo.propTypes = {
  docid: PropTypes.string.isRequired,
  toDosAdditionalF: PropTypes.array.isRequired,
  // posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
