import { useEffect, useContext } from 'react';

import useUser from '../../hooks/user';
import UserContext from '../../context/user';

import NavBarAndHeader from '../../pages/navBar';
import HandleEmailAddress from './toDoSettings/editSettings/handleEmailAddress';
import HandleFullName from './toDoSettings/editSettings/handleFullName';
import HandlePassword from './toDoSettings/editSettings/handlePassword';
import HandleUsername from './toDoSettings/editSettings/handleUsername';
import HandlePhone from './toDoSettings/editSettings/handlePhone';
import HandleGender from './toDoSettings/editSettings/handleGender';
import HandleCity from './toDoSettings/editSettings/handleCity';
import HandleCountry from './toDoSettings/editSettings/handleCountry';

import DeleteUserAccount from './toDoSettings/settings.deleteUserAccount';

import { CheckUserProfile } from './toDoSettings/settings.checkUserProfile';
import DisplayUser from './toDoSettings/displayUser';

export default function Setting() {
  const { handlePass, password, setPassword, passOne, passTwo, setCheckPass } =
    HandlePassword();
  const { handleEmailAddress, emailAddress, setEmailAddress } =
    HandleEmailAddress();
  const { handleFullName, fullName, setFullName } = HandleFullName();
  const { handleUsername, username, setUsername } = HandleUsername();
  const { handlePhone, phone, setPhone } = HandlePhone();
  const { handleGender, gender, setGender } = HandleGender();
  const { handleCity, city, setCity } = HandleCity();
  const { handleCountry, country, setCountry } = HandleCountry();
  const { DUA } = DeleteUserAccount();

  const isInvalidPassword = password === '';
  const isInvalidEmailAddress = emailAddress === '';
  const isInvalidFullName = fullName === '';
  const isInvalidUsername = username === '';
  const isInvalidPhone = phone === '';
  const isInvalidGender = gender === '';
  const isInvalidCity = city === '';
  const isInvalidCountry = country === '';

  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    document.title = `Settings -  ${user?.username} Profile`;
  }, []);

  return (
    <div>
      <NavBarAndHeader />
      <DisplayUser
        passOne={passOne}
        passTwo={passTwo}
        emailAddress={emailAddress}
        fullName={fullName}
        username={username}
        phone={phone}
        gender={gender}
        city={city}
        country={country}
        CheckUserProfile={CheckUserProfile}
        handlePass={handlePass}
        setPassword={setPassword}
        setCheckPass={setCheckPass}
        handleEmailAddress={handleEmailAddress}
        setEmailAddress={setEmailAddress}
        handleFullName={handleFullName}
        setFullName={setFullName}
        handleUsername={handleUsername}
        setUsername={setUsername}
        handlePhone={handlePhone}
        setPhone={setPhone}
        handleGender={handleGender}
        setGender={setGender}
        handleCity={handleCity}
        setCity={setCity}
        handleCountry={handleCountry}
        setCountry={setCountry}
        DUA={DUA}
        isInvalidPassword={isInvalidPassword}
        isInvalidEmailAddress={isInvalidEmailAddress}
        isInvalidFullName={isInvalidFullName}
        isInvalidUsername={isInvalidUsername}
        isInvalidPhone={isInvalidPhone}
        isInvalidGender={isInvalidGender}
        isInvalidCity={isInvalidCity}
        isInvalidCountry={isInvalidCountry}
      />
    </div>
  );
}
