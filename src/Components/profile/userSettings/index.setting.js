import { useContext, useState } from 'react';

import UserContext from '../../../context/user';
import useUser from '../../../hooks/user';
import FirebaseContext from '../../../context/firebaseContext';

export default function IndexSetting() {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  const { firebaseLib } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [checkEmailAddress, setCheckEmailAddress] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [userArray, setUserArray] = useState([]);

  const passOne = password;
  const passTwo = checkPass;

  return {
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
    error,
    setError,
    passOne,
    passTwo,
    setCheckPass,
    userArray,
    setUserArray,
    checkEmailAddress,
    setCheckEmailAddress,
    checkPassword,
    setCheckPassword,
  };
}
