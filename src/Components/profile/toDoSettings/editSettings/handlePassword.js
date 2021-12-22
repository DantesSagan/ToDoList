import { updatePassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import IndexSetting from '../index.setting';

export default function HandlePassword() {
  const { password, setPassword, setError, setCheckPass, passOne, passTwo } =
    IndexSetting();

  const handlePass = async (event) => {
    event.preventDefault();

    const auth = getAuth();

    if (passOne !== passTwo) {
      alert('Wrong password, confirm pass');
      console.log('Wrong password, confirm pass');
      return null;
    } else {
      await updatePassword(auth.currentUser, password)
        .then((item) => {
          console.log('Changes password successfully: ', item);
          alert('Changes password successfully: ', item);
        })
        .catch((error) => {
          console.log('wrong pass', error);
          setError(error);
        });
      console.log('Password confirmed');
    }
  };
  return {
    handlePass,
    password,
    setPassword,
    passOne,
    passTwo,
    setCheckPass,
  };
}
