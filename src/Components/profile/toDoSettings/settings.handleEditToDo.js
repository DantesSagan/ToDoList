import { updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import { updatePassword } from 'firebase/auth';
import { updateEmail } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import { doesUsernameExist } from '../../../services/firebase';
import IndexSetting from './index.setting';

export default function HandleEditToDoConst() {
  const {
    user,
    firebaseLib,
    username,
    setUsername,
    fullName,
    setFullName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    country,
    setCountry,
    phone,
    setPhone,
    city,
    setCity,
    gender,
    setGender,
    setError,
  } = IndexSetting();

  const handleEditToDo = async (event) => {
    event.preventDefault();

    // UPDATE INPUT WHEN A DATA WAS EDIT SUCCESSFULLY
    setCity('');
    setCountry('');
    setGender('');
    setPhone('');
    setUsername('');
    setFullName('');
    setEmailAddress('');

    const auth = getAuth();
    const usernameExists = await doesUsernameExist(username);

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
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

    if (!usernameExists) {
      // UPDATE EMAIL
      await updateEmail(auth.currentUser, emailAddress).then((item) => {
        console.log('Changes email successfully: ', item);
        alert('Changes email successfully: ', item);
      });
      // UPDATE PASSWORD 
      await updatePassword(auth.currentUser, password).then((item) => {
        console.log('Changes password successfully: ', item);
        alert('Changes password successfully: ', item);
      });
      // UPDATE PROFILE
      await updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then((docRef) => {
          console.log('Changes name successfully: ', docRef);
          alert('Changes name successfully: ', docRef);
        })
        .catch((error) => {
          console.error('Error with name changes: ', error);
        });
      try {
      } catch (error) {
        setCity('');
        setPhone('');
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  };
  return {
    handleEditToDo,
    username,
    setUsername,
    fullName,
    setFullName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    country,
    setCountry,
    phone,
    setPhone,
    city,
    setCity,
    gender,
    setGender,
  };
}

