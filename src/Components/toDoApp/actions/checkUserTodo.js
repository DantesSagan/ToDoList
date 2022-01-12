// import { firebaseLib } from '../../../firebaseLibrary/firebaseLib';

// export default async function Checking({ user }) {
//   const result = await firebaseLib.firestore().collection('todos').get();
//   const users = result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id,
//   }));

//   const mapToDoID = users.map((item) =>
//     item.toDosArray.map((item) => item.userId)
//   );
//   const comparison = mapToDoID.map((item) => {
//     console.log(item[0] === user?.userId);
//     return item[0] === user?.userId;
//   });
//   return {
//     comparison,
//   };
// }
