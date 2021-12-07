import React, { useState } from 'react';
import AddToDo from './add-to-do';

export default function ToDo({ docId, toDosAdditional: toDoS, toDoTextArea }) {
  const [toDosAdditional, setToDosAdditional] = useState(toDoS);

  return (
    <div>
      <AddToDo
        docId={docId}
        toDosAdditional={toDosAdditional}
        toDoTextArea={toDoTextArea}
        setToDosAdditional={setToDosAdditional}
      />
    </div>
  );
}
