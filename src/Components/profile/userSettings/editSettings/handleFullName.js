import IndexSetting from '../index.setting';
import { getDocs, collection, updateDoc } from 'firebase/firestore';

export default function HandleFullName() {
  const { user, firebaseLib, fullName, setFullName } = IndexSetting();
const isInvalidFullName = fullName === '';

  const handleFullName = async (event) => {
    event.preventDefault();

    setFullName('');

    const querySnapshot = await getDocs(
      collection(firebaseLib.firestore(), 'users')
    );

    querySnapshot.forEach((doc) => {
      if (user?.userId === doc.id) {
        updateDoc(doc.ref, {
          fullName,
        })
          .then(() => {
            console.log('FullName changed successfully: ', fullName);
            alert('FullName changed successfully: ', fullName);
          })
          .catch((error) => {
            console.error('Error with FullName changed: ', error);
          });
      } else {
        return null;
      }
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return (
    <div className={`${isInvalidFullName && 'opacity-60'}`}>
      <input
        aria-label='Enter your full name'
        type='text'
        placeholder='Full name'
        className='float-left text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
        onChange={({ target }) => setFullName(target.value)}
        value={fullName}
      />
      <button
        disabled={isInvalidFullName}
        className={`float-right bg-black hover:bg-red-600 text-white m-3 p-1 rounded-lg font-bold `}
        type='submit'
        onClick={handleFullName}
      >
        Change full name
      </button>
    </div>
  );
}
