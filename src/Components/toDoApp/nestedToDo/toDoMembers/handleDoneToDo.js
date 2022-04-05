import { getDocs, updateDoc, collection } from 'firebase/firestore';

export default function HandleDoneToDo({
  setDoneToDo,
  doneToDo,
  firebaseLib,
  disNameArray,
  item,
  ind,
}) {
  const handleDoneToDo = async (event) => {
    event.preventDefault();

    // UPDATE STATE WHEN A DATA WAS EDIT SUCCESSFULLY
    setDoneToDo(!doneToDo);

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'todos')
    );
    // First of all when you click to handleDoneToDo will displayed not doneToDo state (true state)
    // And push true state to doneToDo
    // if else you click to handleDoneToDo when doneToDo equal true will be displayed
    // false state and push false boolean state to firebase cloud
    disNameArray[item][ind].doneToDo === true
      ? querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          return disNameArray[item][ind].toDoID === doc.id
            ? updateDoc(doc.ref, {
                toDosArray: [
                  {
                    displayName: disNameArray[item][ind].displayName,
                    createdAt: disNameArray[item][ind].createdAt,
                    title: disNameArray[item][ind].title,
                    toDo: disNameArray[item][ind].toDo,
                    toDoID: disNameArray[item][ind].toDoID,
                    userId: disNameArray[item][ind].userId,
                    doneToDo: doneToDo,
                    untilTime: disNameArray[item][ind].untilTime,
                    importance: disNameArray[item][ind].importance,
                  },
                ],
              })
                .then(() => {
                  window.location.reload();
                  console.log(
                    'Nested DoneToDo changed successfully: ',
                    disNameArray[item][ind].doneToDo
                  );
                })
                .catch((error) => {
                  console.error('Error with city changed: ', error);
                })
            : null;
        })
      : querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          return disNameArray[item][ind].toDoID === doc.id
            ? updateDoc(doc.ref, {
                toDosArray: [
                  {
                    displayName: disNameArray[item][ind].displayName,
                    createdAt: disNameArray[item][ind].createdAt,
                    title: disNameArray[item][ind].title,
                    toDo: disNameArray[item][ind].toDo,
                    toDoID: disNameArray[item][ind].toDoID,
                    userId: disNameArray[item][ind].userId,
                    doneToDo: !doneToDo,
                    untilTime: 0,
                    importance: disNameArray[item][ind].importance,
                  },
                ],
              })
                .then(() => {
                  window.location.reload();
                  console.log(
                    'Nested DoneToDo changed successfully: ',
                    disNameArray[item][ind].doneToDo
                  );
                })
                .catch((error) => {
                  console.error('Error with city changed: ', error);
                })
            : null;
        });
  };
  return {
    handleDoneToDo,
  };
}
