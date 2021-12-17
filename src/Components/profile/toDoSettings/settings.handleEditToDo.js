import { useState, useContext } from 'react';

import FirebaseContext from '../../../context/firebaseContext';
import UserContext from '../../../context/user';
import useUser from '../../../hooks/user';

import { updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import { updatePassword } from 'firebase/auth';
import { updateEmail } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import { doesUsernameExist } from '../../../services/firebase';
import { getUserByUsername } from '../../../services/firebase';

export default function HandleEditToDoConst() {
  // this need to rework coz = doesn't work
  // need check why data doesn't updated
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const { firebaseLib } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  const [error, setError] = useState('');

  const handleEditToDo = async (event) => {
    event.preventDefault();

    setCity('');
    setCountry('');
    setGender('');
    setPhone('');
    setUsername('');
    setFullName('');
    setEmailAddress('');

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      if (doc.id === user?.username) {
        updateDoc(doc.ref, {
          emailAddress: emailAddress.toLowerCase(),
          gender: gender,
          city: city,
          phone: phone,
          country: country,
          username: username.toLowerCase(),
          fullName,
          dateCreated: Date.now(),
        })
          // .then((doc) => {
          //   if (doc && doc.exists) {
          //     var data = doc.data();
          //     // saves the data to 'name'
          //     firebaseLib
          //       .firestore()
          //       .collection('users')
          //       .doc(username)
          //       .set(data)
          //       .then(() => {
          //         // deletes the old document
          //         firebaseLib
          //           .firestore()
          //           .collection(doc.id === user?.username)
          //           .doc(username)
          //           .delete();
          //       });
          //   }
          // })
          .then((docRef) => {
            console.log('Changes successfully: ', docRef);
            alert('Changes successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });

    // const usernameExists = await doesUsernameExist(username);
    // const getUsername = await getUserByUsername(username);
    // const auth = getAuth();

    // if (!usernameExists) {
    //   await updatePassword(auth.currentUser, {
    //     password: password,
    //   })
    //     .then((docRef) => {
    //       console.log('Changes password successfully: ', docRef);
    //       alert('Changes password successfully: ', docRef);
    //     })
    //     .catch((error) => {
    //       console.error('Error with password changes: ', error);
    //     });

    //   await updateEmail(auth.currentUser, {
    //     emailAddress: emailAddress,
    //   })
    //     .then((docRef) => {
    //       console.log('Changes email successfully: ', docRef);
    //       alert('Changes email successfully: ', docRef);
    //     })
    //     .catch((error) => {
    //       console.error('Error with email changes: ', error);
    //     });

    //   await updateProfile(auth.currentUser, {
    //     displayName: username,
    //   })
    //     .then((docRef) => {
    //       console.log('Changes name successfully: ', docRef);
    //       alert('Changes name successfully: ', docRef);
    //     })
    //     .catch((error) => {
    //       console.error('Error with name changes: ', error);
    //     });
    //   try {
    //   } catch (error) {
    //     setCity('');
    //     setPhone('');
    //     setFullName('');
    //     setEmailAddress('');
    //     setPassword('');
    //     setError(error.message);
    //   }
    // } else {
    //   setUsername('');
    //   setError('That username is already taken, please try another.');
    // }
  };
  return { handleEditToDo };
}
