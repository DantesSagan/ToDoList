import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FirebaseContext from '../../context/firebaseContext';
import NavBarAndHeader from '../../pages/navBar';

import * as ROUTES from '../../constants/routes';

import {
  doc,
  updateDoc,
  where,
  addDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { getAuth, onAuthStateChanged, updateEmail } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import {
  doesUsernameExist,
  getUserByUserId,
  getUserByUsername,
} from '../../services/firebase';
export default function Setting({ user }) {
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
  const isInvalid = password === '' || emailAddress === '';

  const editUser = async () => {
    const auth = getAuth();
    const currentUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log(uid);
      } else {
        // User is signed out
        // ...
      }
    });
    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
    await updateDoc(querySnapshot, {
      gender: gender,
      city: city,
      phone: phone,
      country: country,
      userId: currentUser.user.uid,
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
  };

  const handleEditToDo = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    const getUsername = await getUserByUsername(username);

    const auth = getAuth();

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });

    const currentUserAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        updateDoc(querySnapshot, {
          gender: gender,
          city: city,
          phone: phone,
          country: country,
          userId: uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          dateCreated: Date.now(),
        })
          .then((docRef) => {
            console.log('Changes docProfile successfully: ', docRef);
            alert('Changes docProfile successfully: ', docRef);
          })
          .catch((error) => {
            console.error('Error with docProfile changes: ', error);
          });
        console.log(uid);
      } else {
        // User is signed out
        // ...
      }
    });

    if (!usernameExists) {
      try {
        await updateEmail(auth.currentUser, {
          emailAddress: emailAddress.toLowerCase(),
        });
        // .then((docRef) => {
        //   console.log('Changes email successfully: ', docRef);
        //   alert('Changes email successfully: ', docRef);
        // })
        // .catch((error) => {
        //   console.error('Error with email changes: ', error);
        // });

        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        // .then((docRef) => {
        //   console.log('Changes name successfully: ', docRef);
        //   alert('Changes name successfully: ', docRef);
        // })
        // .catch((error) => {
        //   console.error('Error with name changes: ', error);
        // });
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
    return currentUserAuth;
  };

  const checkUserProfile = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log('Sign-in provider: ' + profile.providerId);
        console.log('  Provider-specific UID: ' + profile.uid);
        console.log('  Name: ' + profile.displayName);
        console.log('  Email: ' + profile.email);
        console.log('  Telephone: ' + profile.phone);
      });
    }
    console.log(user);
  };
  useEffect(() => {
    document.title = 'Settings - ToDoList';
  }, []);

  const deleteUserAccount = async () => {
    const userAuth = getAuth();

    // const userDel = userAuth.currentUser;

    const getUsername = await getUserByUsername(username);
    const batch = firebaseLib.firestore().batch();
    // const identity = getDocs(
    //   doc(
    //     firebaseLib.firestore(),
    //     'users',
    //     where('username', '==', username),
    //     username
    //   )
    // );
    const getTodos = await firebaseLib
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.ref === user?.username) {
            batch.delete(doc.ref);
          } else {
            return null;
          }
          console.log(doc);
        });
      });

    await batch
      .commit()
      .then((docRef) => {
        console.log('Document was deleted with ID: ', docRef);
        alert('Document was deleted with ID: ', docRef);
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
    return getTodos;
    // deleteDoc(doc(firebaseLib.firestore(), 'users', 'alex'))
    // const batch = firebaseLib.firestore().batch();
    // const getTodos = firebaseLib
    //   .firestore()
    //   .collection('users')
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       if (user?.username === doc.ref) {
    //         batch.delete(doc.ref);
    //       } else {
    //         return null;
    //       }
    //       console.log(doc.id);
    //     });
    //   });

    // batch
    //   .commit()
    //   .then((docRef) => {
    //     console.log('Document was deleted with ID: ', docRef);
    //     alert('Document was deleted with ID: ', docRef);
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting document: ', error);
    //   });
    // return getTodos;
    // const currentUserAuth = onAuthStateChanged(userAuth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     const uid = user.uid;

    //     return getTodos;
    //   } else {
    //     // User is signed out
    //     // ...
    //     return null;
    //   }
    // });
    // await deleteUser(userDel)
    //   .then((del) => {
    //     console.log('User deleted successfully: ', del);
    //     alert('User deleted successfully: ', del);
    //   })
    //   .catch((error) => {
    //     console.log('User deleted error: ', error);
    //     alert('User deleted error: ', error);
    //   });
  };

  return (
    <div>
      <NavBarAndHeader />
      <form
        className='container block mx-auto max-w-screen-sm item-center justify-center'
        method='POST'
      >
        <fieldset className='border border-gray-primary p-4'>
          <legend className='block m-auto'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12'
              fill='none'
              viewBox='0 0 24 24'
              stroke='black'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </legend>
          <div className='text-3xl text-center text-black underline p-4'>
            Change data Form
          </div>
          <input
            placeholder='Gender/sex/floor/ground xd'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setGender(target.value)}
            type='text'
            checked
            value={gender}
          />
          <input
            aria-label='Enter your city'
            type='text'
            placeholder='City'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCity(target.value)}
            value={city}
          />
          <input
            aria-label='Enter your Country'
            type='text'
            placeholder='Country'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setCountry(target.value)}
            value={country}
          />
          <input
            aria-label='Enter your phone number'
            type='tele'
            placeholder='Phone Number'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setPhone(target.value)}
            value={phone}
          />
          <input
            aria-label='Enter your username'
            type='text'
            placeholder='Username'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            aria-label='Enter your full name'
            type='text'
            placeholder='Full name'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            aria-label='Enter your email address'
            type='email'
            placeholder='Email address'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            aria-label='Enter your password'
            type='password'
            placeholder='Password'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />{' '}
        </fieldset>
        <button
          onClick={handleEditToDo}
          type='submit'
          className={`bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold `}
        >
          Change
        </button>
        <div className='p-4'>
          <button
            onClick={checkUserProfile}
            type='button'
            className='bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold'
          >
            Check User Profile
          </button>
        </div>
        <div className='p-4'>
          <button
            onClick={deleteUserAccount}
            type='button'
            className='bg-red-700 hover:bg-red-600 text-white w-full rounded h-8 font-bold'
          >
            Delete user account
          </button>
        </div>
      </form>
    </div>
  );
}
