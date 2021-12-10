import { firebaseLib, FieldValue } from '../firebaseLibrary/firebaseLib';

export async function doesUsernameExist(username) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebaseLib
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

// export async function getToDo(request, response) {
//   const result = await firebaseLib
//     .firestore()
//     .collection('todos')
//     .where('username', '==', request.user.username)
//     .orderBy('createdAt', 'desc')
//     .get()
//     .then((data) => {
//       let todos = [];
//       data.forEach((doc) => {
//         todos.push({
//           todoId: doc.id,
//           title: doc.data().title,
//           username: doc.data().username,
//           createdAt: doc.data().createdAt,
//         });
//       });
//       return response.json(todos);
//     })
//     .catch((err) => {
//       console.error(err);
//       return response.status(500).json({ error: err.code });
//     });
// }
