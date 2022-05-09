import { getDocs, updateDoc, collection } from 'firebase/firestore';

export default function HandleDoneSubToDo({
  startTransition,
  setDoneToDo,
  doneToDo,
  firebaseLib,
  nestedToDoArray,
  itemsNested,
  index,
}) {
  const handleDoneToDoSub = async (event) => {
    event.preventDefault();

    startTransition(async () => {
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
            nestedToDoArray[itemsNested].toDosArray.toDoID === docSub.id;
          // let checkParentID =
          //   doc.id === nestedToDoArray[itemsNested].toDosArray.parentID;

          return checkToDoID
            ? nestedToDoArray[itemsNested].toDosArray.doneToDo === true
              ? updateDoc(docSub.ref, {
                  toDosArray: {
                    displayName:
                      nestedToDoArray[itemsNested].toDosArray.displayName,
                    createdAt:
                      nestedToDoArray[itemsNested].toDosArray.createdAt,
                    toDo: nestedToDoArray[itemsNested].toDosArray.toDo,
                    toDoID: nestedToDoArray[itemsNested].toDosArray.toDoID,
                    userId: nestedToDoArray[itemsNested].toDosArray.userId,
                    parentID: doc.id,
                    doneToDo: doneToDo,
                    untilTime:
                      nestedToDoArray[itemsNested].toDosArray.untilTime,
                    importance:
                      nestedToDoArray[itemsNested].toDosArray.importance,
                  },
                })
                  .then(() => {
                    window.location.reload();
                    console.log(
                      'Sub DoneToDo changed successfully: ',
                      nestedToDoArray[itemsNested].toDosArray.doneToDo,
                      doneToDo
                    );
                  })
                  .catch((error) => {
                    console.error('Error with city changed: ', error);
                  })
              : updateDoc(docSub.ref, {
                  toDosArray: {
                    displayName:
                      nestedToDoArray[itemsNested].toDosArray.displayName,
                    createdAt:
                      nestedToDoArray[itemsNested].toDosArray.createdAt,
                    toDo: nestedToDoArray[itemsNested].toDosArray.toDo,
                    toDoID: nestedToDoArray[itemsNested].toDosArray.toDoID,
                    userId: nestedToDoArray[itemsNested].toDosArray.userId,
                    parentID: doc.id,
                    doneToDo: !doneToDo,
                    untilTime: 0,
                    importance:
                      nestedToDoArray[itemsNested].toDosArray.importance,
                  },
                })
                  .then(() => {
                    window.location.reload();
                    console.log(
                      'SubDoneToDo changed successfully: ',
                      nestedToDoArray[itemsNested].toDosArray.doneToDo,
                      doneToDo
                    );
                  })
                  .catch((error) => {
                    console.error('Error with city changed: ', error);
                  })
            : null;
        });
      });
    });
  };
  return {
    handleDoneToDoSub,
  };
}
