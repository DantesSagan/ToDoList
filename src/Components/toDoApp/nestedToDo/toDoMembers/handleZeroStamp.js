import { getDocs, updateDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../../../constants/routes';

export default function HandleZeroStamp({
  untilTime,
  firebaseLib,
  disNameArray,
  item,
  ind,
}) {
  const navigate = useNavigate();
  const handleZeroStamp = async (e) => {
    e.preventDefault();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    querySnapshot.forEach((doc) => {
      if (disNameArray[item].toDosArray.toDoID === doc.id) {
        console.log(disNameArray[item].toDosArray.toDoID === doc.id);
        updateDoc(doc.ref, {
          toDosArray: {
            displayName: disNameArray[item].toDosArray.displayName,
            createdAt: disNameArray[item].toDosArray.createdAt,
            title: disNameArray[item].toDosArray.title,
            toDo: disNameArray[item].toDosArray.toDo,
            toDoID: disNameArray[item].toDosArray.toDoID,
            userId: disNameArray[item].toDosArray.userId,
            doneToDo: disNameArray[item].toDosArray.doneToDo,
            untilTime: 0,
            importance: disNameArray[item].toDosArray.importance,
          },
        })
          .then(() => {
            navigate(ROUTES.DASHBOARD);
            console.log('DoneToDo changed successfully: ', untilTime);
          })
          .catch((error) => {
            console.error('Error with city changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return {
    handleZeroStamp,
  };
}
