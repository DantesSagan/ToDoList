import { getDocs, updateDoc, collection } from 'firebase/firestore';

export default function HandleDoneSubToDo({
  setDoneToDo,
  doneToDo,
  firebaseLib,
  nestedToDoArray,
  itemsNested,
  index,
}) {
  const handleDoneToDoSub = async (event) => {
    event.preventDefault();

    // UPDATE STATE WHEN A DATA WAS EDIT SUCCESSFULLY
    setDoneToDo(!doneToDo);

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );

    return querySnapshot.forEach(async (doc) => {
      let getID = doc.id;
      const querySnapshotSub = await getDocs(
        collection(firebaseLib.firestore(), 'todos', getID, 'nestedToDo')
      );

      return querySnapshotSub.forEach((docSub) => {
        let checkToDoID =
          nestedToDoArray[itemsNested][index].toDoID === docSub.id;
        // let checkParentID =
        //   doc.id === nestedToDoArray[itemsNested][index].parentID;

        return checkToDoID
          ? nestedToDoArray[itemsNested][index].doneToDo === true
            ? updateDoc(docSub.ref, {
                toDosArray: [
                  {
                    displayName:
                      nestedToDoArray[itemsNested][index].displayName,
                    createdAt: nestedToDoArray[itemsNested][index].createdAt,
                    toDo: nestedToDoArray[itemsNested][index].toDo,
                    toDoID: nestedToDoArray[itemsNested][index].toDoID,
                    userId: nestedToDoArray[itemsNested][index].userId,
                    parentID: doc.id,
                    doneToDo: doneToDo,
                    untilTime: nestedToDoArray[itemsNested][index].untilTime,
                  },
                ],
              })
                .then(() => {
                  console.log(
                    'DoneToDo changed successfully: ',
                    nestedToDoArray[itemsNested][index].doneToDo,
                    doneToDo
                  );
                })
                .catch((error) => {
                  console.error('Error with city changed: ', error);
                })
            : updateDoc(docSub.ref, {
                toDosArray: [
                  {
                    displayName:
                      nestedToDoArray[itemsNested][index].displayName,
                    createdAt: nestedToDoArray[itemsNested][index].createdAt,
                    toDo: nestedToDoArray[itemsNested][index].toDo,
                    toDoID: nestedToDoArray[itemsNested][index].toDoID,
                    userId: nestedToDoArray[itemsNested][index].userId,
                    parentID: doc.id,
                    doneToDo: !doneToDo,
                    untilTime: nestedToDoArray[itemsNested][index].untilTime,
                  },
                ],
              })
                .then(() => {
                  console.log(
                    'DoneToDo changed successfully: ',
                    nestedToDoArray[itemsNested][index].doneToDo,
                    doneToDo
                  );
                })
                .catch((error) => {
                  console.error('Error with city changed: ', error);
                })
          : null;
      });
    });
  };
  return {
    handleDoneToDoSub,
  };
}
