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

// export async function getSuggestedProfiles(userId, following) {
//   let query = firebaseLib.firestore().collection('users');

//   if (following.length > 0) {
//     query = query.where('userId', 'not-in', [...following, userId]);
//   } else {
//     query = query.where('userId', '!=', userId);
//   }
//   const result = await query.limit(10).get();

//   const profiles = result.docs.map((user) => ({
//     ...user.data(),
//     docId: user.id,
//   }));

//   return profiles;
// }

// updateLoggedInUserFollowing, updateFollowedUserFollowers

// export async function updateLoggedInUserFollowing(
//   loggedInUserDocId, // logged in user document id  (me: alex' profile)
//   profileId, // the user that alex requests to follow
//   isFollowingProfile //  true/false (am i following this person())
// ) {
//   return firebaseLib
//     .firestore()
//     .collection('users')
//     .doc(loggedInUserDocId)
//     .update({
//       following: isFollowingProfile
//         ? FieldValue.arrayRemove(profileId)
//         : FieldValue.arrayUnion(profileId),
//     });
// }

// export async function updateFollowedUserFollowers(
//   profileDocId, // logged in user document id  (me: alex' profile)
//   loggedInUserDocId, // the user that alex requests to follow
//   isFollowingProfile //  true/false (am i following this person())
// ) {
//   return firebaseLib
//     .firestore()
//     .collection('users')
//     .doc(profileDocId)
//     .update({
//       followers: isFollowingProfile
//         ? FieldValue.arrayRemove(loggedInUserDocId)
//         : FieldValue.arrayUnion(loggedInUserDocId),
//     });
// }

export async function getToDo(userId, quest) {
  const result = await firebaseLib
    .firestore()
    .collection('todos')
    .where('userId', 'in', quest)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

// export async function getUserPhotosByUserId(userId) {
//   const result = await firebaseLib
//     .firestore()
//     .collection('photos')
//     .where('userId', '==', userId)
//     .get();

//   const photos = result.docs.map((photo) => ({
//     ...photo.data(),
//     docId: photo.id,
//   }));
//   return photos;
// }

// export async function isUserFollowingProfile(
//   loggedInUserUsername,
//   profileUserId
// ) {
//   const result = await firebaseLib
//     .firestore()
//     .collection('users')
//     .where('username', '==', loggedInUserUsername)
//     .where('following', 'array-contains', profileUserId)
//     .get();

//   const [response = {}] = result.docs.map((item) => ({
//     ...item.data(),
//     docId: item.id,
//   }));

//   return response.userId;
// }

// export async function toggleFollow(
//   isFollowingProfile,
//   activeUserDocId,
//   profileDocId,
//   profileUserId,
//   followingUserId
// ) {
//   // 1st param alex's doc id
//   // 2nd param: raphael 's doc id
//   // 3rd param: is user following this profile? e.g does karl follow raphael? (true/false)
//   await updateLoggedInUserFollowing(
//     activeUserDocId,
//     profileUserId,
//     isFollowingProfile
//   );

//   // 1st param: alex's doc id
//   // // 2nd param: the user that alex requests to follow
//   /// 3rd param: is user following this profile? e.g does karl follow raphael? (true/false)
//   await updateFollowedUserFollowers(
//     profileDocId,
//     followingUserId,
//     isFollowingProfile
//   );
// }
