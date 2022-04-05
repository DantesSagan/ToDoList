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
      if (disNameArray[item][ind].toDoID === doc.id) {
        console.log(disNameArray[item][ind].toDoID === doc.id);
        updateDoc(doc.ref, {
          toDosArray: [
            {
              displayName: disNameArray[item][ind].displayName,
              createdAt: disNameArray[item][ind].createdAt,
              title: disNameArray[item][ind].title,
              toDo: disNameArray[item][ind].toDo,
              toDoID: disNameArray[item][ind].toDoID,
              userId: disNameArray[item][ind].userId,
              doneToDo: disNameArray[item][ind].doneToDo,
              untilTime: 0,
              importance: disNameArray[item][ind].importance
            },
          ],
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
