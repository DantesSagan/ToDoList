import React, { useRef } from 'react';
import ToDo from './toDo';

export default function TodoApp({ content }) {
  const toDoTextArea = useRef(null);

  const handleFocus = toDoTextArea.current.focus();
  return (
    <div>
      <ToDo
        docId={content.docId}
        toDosAdditional={content.toDosAdditional}
        toDoTextArea={content.toDoTextArea}
      />
    </div>
  );
}
