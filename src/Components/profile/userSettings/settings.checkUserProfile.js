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
      {/* <div>
        <h1>Profile data of - {user?.username}</h1>
        <div>
          {user !== null
            ? user.providerData.forEach((profile) => {
                return (
                  <div>
                    <h2>Sign-in provider: {profile.providerId}</h2>
                    <h2> Profiver-specific UID: {profile.uid}</h2>
                    <h2> Name: {profile.displayName}</h2>
                    <h2> Email: {profile.email}</h2>
                    <h2> Telephone: {profile.phone}</h2>
                  </div>
                );
              })
            : null}
        </div>
      </div> */}
      <button
        onClick={CheckUserProfile}
        type='button'
        className='bg-black hover:bg-red-600 text-white w-full rounded h-8 font-bold transition ease-in-out duration-300 focus:border-black border-4 border-solid'
      >
        Check User Profile
      </button>{' '}
      <br />
      <p className='text-center text-sm border-2 border-black'>*check console.log</p>
    </div>
  );
};
