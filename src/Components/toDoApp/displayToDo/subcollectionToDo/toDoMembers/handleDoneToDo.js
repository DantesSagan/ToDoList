import { getDocs, updateDoc, collection } from 'firebase/firestore';

export default function HandleDoneSubToDo({
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
              doneToDo: !doneToDo,
            },
          ],
        })
          .then(() => {
            setDoneToDo(!doneToDo);
            console.log(
              'DoneToDo changed successfully: ',
              disNameArray[item][ind].doneToDo,
              doneToDo
            );
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
    handleDoneToDo,
  };
}
