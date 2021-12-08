import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Footer from './footer';
import ToDo from './toDo';

export default function TodoApp({ content }) {
  const toDoTextArea = useRef(null);

  // const handleFocus = toDoTextArea.current.focus();
  return (
    <div>
      <ToDo
        docId={content.docId}
        toDosAdditional={content.toDosAdditional}
        posted={content.dateCreated}
        toDoTextArea={toDoTextArea}
      />
      <Footer titleOfToDo={content.titleOfToDo} username={content.username} />
    </div>
  );
}
TodoApp.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    titleOfToDo: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
    toDosAdditional: PropTypes.array.isRequired,
  }),
};
