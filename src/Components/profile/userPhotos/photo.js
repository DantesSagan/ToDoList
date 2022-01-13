import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useState } from 'react';
import ConvertInfo from './convertInfo';
import DeletePhoto from './deletePhoto';
import SubmitPhoto from './submitPhoto';
import '../../../App.css';
export default function Photo({ user }) {
  const path = `gs://todolist-64991.appspot.com`;
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectFile, setSelectFile] = useState(null);
  const [fullPath, setFullPath] = useState(
    path + `/images/avatars/${user?.username}`
  );
  console.log(fullPath);
  // Delete chosen photo from current auth user
  const { delPhoto } = DeletePhoto({ getStorage, ref, fullPath, deleteObject });
  // Converting value of info to human readable parameters in KB, MB, GB and etc
  const { convertDataSize } = ConvertInfo({ selectFile });
  // Submit photo to firebase/storage where i can get this photos from there
  //   and use for changing photo's profile in current auth user
  const { handleSubmitPhoto } = SubmitPhoto({ photoUrl, selectFile, fullPath });
  // Almost all info about file what u get it in to firebase/storage
  const dataFile = () => {
    if (selectFile) {
      return (
        <div className='m-6'>
          <div className='text-2xl'>
            Name of file: {` `}
            <span className='font-bold'>{selectFile.name}</span>
          </div>
          <div className='text-2xl'>
            Type of file: {` `}
            <span className='text-xl font-bold'>{selectFile.type}</span>
          </div>
          {convertDataSize()}
        </div>
      );
    }
  };

  return (
    <div className='container block mx-auto max-w-screen-lg item-center justify-center p-4 m-12 bg-white rounded-lg border-t border-4 border-red-600'>
      <form
        className='p-4 grid'
        method='POST'
        onSubmit={(event) => {
          selectFile >= 1 ? handleSubmitPhoto(event) : event.preventDefault();
        }}
      >
        <h1 className='text-4xl font-bold m-4'>Photo settings</h1>
        <input
          type='file'
          className='p-4 text-2xl m-2 '
          onChange={(e) => setSelectFile(e.target.files[0])}
        />
        <button
          className='p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold w-2/6'
          onClick={handleSubmitPhoto}
        >
          Set photo
        </button>
      </form>
      {dataFile()}{' '}
      <form className='p-4 grid '>
        <h1 className='text-4xl font-bold m-4'>{`Delete photo profile: ${user?.username}`}</h1>
        <button
          id='del'
          className='p-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold w-2/6'
          onClick={delPhoto}
        >
          Delete photo
        </button>
      </form>
    </div>
  );
}
