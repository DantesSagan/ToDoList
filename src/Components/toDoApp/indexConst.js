import { useState, useContext, useRef } from 'react';
import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/user';
import useUser from '../../hooks/user';

export default function IndexConst() {
  const [toDo, setToDo] = useState('');
  const [title, setTitle] = useState('');
  const [userId] = useState();
  const [createdAt] = useState(Number);

  const [toDosArray, setToDoSArray] = useState([]);

  const { firebaseLib, FieldValue } = useContext(FirebaseContext);

  const [nestedArrayToDo, setNestedArrayToDo] = useState([]);

  const [arrayID, setArrayID] = useState([]);

  const refTodo = useRef(null);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const { user } = useUser(displayName?.uid);

  const getRandomSymbolAndID = () => {
    var alphanumeric =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    var twentyEight = 28;
    for (let i = 0; i < twentyEight; ++i) {
      result += alphanumeric.charAt(Math.random() * alphanumeric.length);
    }

    return result;
  };

  let toDoID = getRandomSymbolAndID();

  return {
    toDo,
    setToDo,
    title,
    setTitle,
    userId,
    createdAt,
    toDosArray,
    setToDoSArray,
    firebaseLib,
    FieldValue,
    refTodo,
    user,
    toDoID,
    displayName,
    nestedArrayToDo,
    setNestedArrayToDo,
    arrayID,
    setArrayID,
  };
}
export const formatTime = () => {
  let date = new Date();

  let monthData = date.getMonth() + 1;
  // Year part from the timestamp
  let year = date.getFullYear();
  // Month part from the timestamp
  let month = monthData < 10 ? `0${monthData}` : monthData;
  // Days part from the timestamp
  let day = date.getDate();
  let days = day < 10 ? `0${day}` : day;

  // Will display time in 2022-10-03 || 2077-03-20 format
  let formattedTime = `${year}-${month}-${days}`;

  console.log(formattedTime);
  return formattedTime;
};
