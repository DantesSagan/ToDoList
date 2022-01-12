import { useState } from 'react';
import ConvertInfo from './convertInfo';
import SubmitPhoto from './submitPhoto';

export default function Photo({ user }) {
  const path = `gs://todolist-64991.appspot.com`;
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectFile, setSelectFile] = useState(null);
  const [fullPath, setFullPath] = useState(
    path + `/images/avatars/${user?.username}`
  );
  console.log(fullPath)
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
    <div className='container block mx-auto max-w-screen-lg item-center justify-center p-4 m-12 bg-white rounded-lg'>
      <form
        className=''
        method='POST'
        onSubmit={(event) => {
          selectFile >= 1
            ? handleSubmitPhoto(event)
            : event.preventDefault();
        }}
      >
        <h1 className='text-4xl font-bold m-4'>Photo settings</h1>
        <input
          type='file'
          className='p-4 text-2xl m-2'
          onChange={(e) => setSelectFile(e.target.files[0])}
        />
        <button
          className='p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold'
          onClick={handleSubmitPhoto}
        >
          Set photo
        </button>
      </form>
      {dataFile()}
    </div>
  );
}
