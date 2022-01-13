import { useNavigate } from 'react-router-dom';

import { doesUsernameExist } from '../../services/firebase';

import IndexSetting from '../../Components/profile/userSettings/index.setting';

import * as ROUTES from '../../constants/routes';
import { useContext } from 'react';
import UserContext from '../../context/user';
import useUser from '../../hooks/user';

export default function HandleSingUp() {
  const {
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
    error,
    passOne,
    passTwo,
    setCheckPass,
    setError,
    firebaseLib,
  } = IndexSetting();
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const navigate = useNavigate();

  const SignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        if (passOne !== passTwo) {
          console.log('Wrong password, confirm pass');
          return null;
        } else {
          const createdUserResult = await firebaseLib
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);
          await createdUserResult.user.updateProfile({
            displayName: username,
          });

          await firebaseLib
            .firestore()
            .collection('users')
            .doc(createdUserResult.user.uid)
            .set({
              gender: gender,
              city: city,
              phone: phone,
              country: country,
              userId: createdUserResult.user.uid,
              username: username.toLowerCase(),
              fullName,
              emailAddress: emailAddress.toLowerCase(),
              dateCreated: Date.now(),
            });

          alert(`${username} was create successfully!`);
          console.log(`${username} was create successfully!`);

          navigate(ROUTES.DASHBOARD);
        }
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
    SignUp,
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
    error,
    passOne,
    passTwo,
    setCheckPass,
  };
}
