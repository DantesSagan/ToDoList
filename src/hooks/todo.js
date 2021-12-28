// import { useEffect, useState } from 'react';
// import { getToDoByToDoID } from '../services/firebase';

// export default function useToDo(toDoID) {
//   const [activeTodo, setActiveToDo] = useState({});

//   useEffect(() => {
//     async function getTodoObjByToDoID(toDoID) {
//       const [todo] = await getToDoByToDoID(toDoID);
//       setActiveToDo(todo || {});
//     }
//     if (toDoID) {
//       getTodoObjByToDoID(toDoID);
//     }
//   }, [toDoID]);
//   return {
//     todo: activeTodo,
//     setActiveToDo,
//   };
// }
    