import React, { useRef } from 'react';
import DashboardToDo from './dashboardToDo';
import PropTypes from 'prop-types';

export default function TodoApp({ content }) {
  const commentInput = useRef(null);
  return (
    <div>
      <DashboardToDo
        docId={content.docId}
        toDosAdditional={content.toDosAdditional}
        commentInput={commentInput}
      />
    </div>
  );
}
TodoApp.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    toDosAdditional: PropTypes.array.isRequired,
  }),
};
