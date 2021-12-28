// import { useContext } from 'react';
// import { firebaseLib } from '../../../firebaseLibrary/firebaseLib';
// import useUser from '../../../hooks/user';

// import UserContext from '../../../context/user';

// export default async function Checking() {
//   const { user: loggedIn } = useContext(UserContext);
//   const { user } = useUser(loggedIn?.uid);
//   const result = await firebaseLib.firestore().collection('todos').get();
//   const users = result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id,
//   }));

//   const mapToDoID = users.map((item) =>
//     item.toDosArray.map((item) => item.userId)
//   );
//   const comparison = mapToDoID.map((item) => item[0] === user?.userId);
//   return [comparison]
// }
