import { getDocs, updateDoc, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

export default function HandleSubStampToDo({
  untilTime,
  setUntilTime,
  firebaseLib,
  nestedToDoArray,
  itemsNested,
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
          nestedToDoArray[itemsNested].toDosArray.toDoID === docSub.id;
        console.log(checkToDoID);

        return checkToDoID
          ? updateDoc(docSub.ref, {
              toDosArray: {
                displayName:
                  nestedToDoArray[itemsNested].toDosArray.displayName,
                createdAt: nestedToDoArray[itemsNested].toDosArray.createdAt,
                toDo: nestedToDoArray[itemsNested].toDosArray.toDo,
                toDoID: nestedToDoArray[itemsNested].toDosArray.toDoID,
                parentID: nestedToDoArray[itemsNested].toDosArray.parentID,
                userId: nestedToDoArray[itemsNested].toDosArray.userId,
                doneToDo: nestedToDoArray[itemsNested].toDosArray.doneToDo,
                importance: nestedToDoArray[itemsNested].toDosArray.importance,
                untilTime: untilTime,
              },
            })
              .then(() => {
                window.location.reload();
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
