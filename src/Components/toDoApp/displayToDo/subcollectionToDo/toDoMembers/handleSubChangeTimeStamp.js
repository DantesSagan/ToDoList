import { getDocs, updateDoc, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../../../../constants/routes';

export default function HandleSubStampToDo({
  untilTime,
  setUntilTime,
  firebaseLib,
  nestedToDoArray,
  itemsNested,
  index,
}) {
  // const navigate = useNavigate();

  const handleSubStamp = async (e) => {
    e.preventDefault();
    setUntilTime(e.target.value);

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    return querySnapshot.forEach(async (doc) => {
      let getID = doc.id;
      let querySnapshotSub = await getDocs(
        collection(firebaseLib.firestore(), 'todos', getID, 'nestedToDo')
      );
      return querySnapshotSub.forEach((docSub) => {
        let checkToDoID =
          nestedToDoArray[itemsNested][index].toDoID === docSub.id;
        console.log(checkToDoID);

        return checkToDoID
          ? updateDoc(docSub.ref, {
              toDosArray: [
                {
                  displayName: nestedToDoArray[itemsNested][index].displayName,
                  createdAt: nestedToDoArray[itemsNested][index].createdAt,
                  toDo: nestedToDoArray[itemsNested][index].toDo,
                  toDoID: nestedToDoArray[itemsNested][index].toDoID,
                  parentID: nestedToDoArray[itemsNested][index].parentID,
                  userId: nestedToDoArray[itemsNested][index].userId,
                  doneToDo: nestedToDoArray[itemsNested][index].doneToDo,
                  untilTime: untilTime,
                },
              ],
            })
              .then(() => {
                // navigate(ROUTES.DASHBOARD);
                alert('DoneToDo changed successfully: ', untilTime);
                console.log('DoneToDo changed successfully: ', untilTime);
              })
              .catch((error) => {
                console.error('Error with city changed: ', error);
              })
          : null;
      });
    });
  };
  return {
    handleSubStamp,
  };
}
