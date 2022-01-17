import { getAuth } from 'firebase/auth';

export const CheckUserProfile = () => {
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
  return (
    <div className='p-4'>
      <button
        onClick={CheckUserProfile}
        type='button'
        className='bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold transition ease-in-out duration-300 focus:border-black border-4 border-solid'
      >
        Check User Profile
      </button>
    </div>
  );
};
