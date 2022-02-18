import { getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { setDoc, arrayUnion } from 'firebase/firestore';

export default function HandleSubmitToDo({
  title,
  toDo,
  toDosArray,
  toDoID,
  untilTime,
  displayName,
  createdAt,
  setToDoSArray,
  setToDo,
  setTitle,
  firebaseLib,
}) {
  const handleSubmitToDo = async (event) => {
    const auth = getAuth();
    const userAuth = auth.currentUser.uid;

    const commaTitle = title.split(',');
    const commaToDo = toDo.split(',');
    event.preventDefault();

    const checkExistingID = Object.keys(toDosArray).map((item) => {
      return toDosArray[item].toDosArray;
    });
    return Object.keys(checkExistingID).map(async (item) => {
      if (checkExistingID[item][0].toDoID === toDoID) {
        console.log('Error this toDoID existing, try again');
      } else {
        const editRef = doc(firebaseLib.firestore(), 'todos', toDoID);
        setToDoSArray([
          ...toDosArray,
          {
            displayName,
            commaTitle,
            commaToDo,
            createdAt,
            toDoID,
            untilTime,
          },
        ]);
        setToDo('');
        setTitle('');

        // function getRandomNumber(max, min) {
        //   return Math.max(Math.random() * (max - min) + min).toFixed(0);
        // }
        // let resultID = getRandomNumber(2000000000000, 5);
        const formatTime = () => {
          var date = new Date();
          // Year part from the timestamp
          var year = date.getFullYear();
          // Month part from the timestamp
          var month = date.getMonth();
          // Days part from the timestamp
          var days = date.getDate();
          // Hours part from the timestamp
          var hours = date.getHours();
          // Minutes part from the timestamp
          var minutes = date.getMinutes();
          // Seconds part from the timestamp
          var seconds = date.getSeconds();

          // Will display time in 10:30:23 format
          var formattedTime = `Posted time toDo: ${year} year, ${month} month, ${days} day, ${hours}:${minutes}:${seconds}`;
          return formattedTime;
        };
        await setDoc(editRef, {
          toDosArray: arrayUnion({
            displayName: displayName,
            createdAt: formatTime(),
            title: commaTitle,
            toDo: commaToDo,
            toDoID: toDoID,
            userId: userAuth,
            untilTime: untilTime,
            doneToDo: false,
          }),
        })
          .then(() => {
            console.log('Document written with title: ', commaTitle);
            console.log('Document written with displayName: ', displayName);
            console.log('Document written with ID: ', toDoID);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          })
          .then(() => {
            window.location.reload();
          });
      }
      return checkExistingID[item][0].toDoID;
    });
  };
  return {
    handleSubmitToDo,
  };
}