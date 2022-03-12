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
        <div className='m-4'>
          <div className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl'>
            Name of file: {` `} <br />
            <span className='font-bold'>{selectFile.name}</span>
          </div>
          <div className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl'>
            Type of file: {` `} <br />
            <span className='text-xl font-bold'>{selectFile.type}</span>
          </div>
          {convertDataSize()}
        </div>
      );
    }
  };

  return (
    <div className='container block mx-auto item-center justify-center p-4 m-12 bg-white rounded-lg border-t border-4 border-red-600 dashboardPage profile'>
      <div className='grid grid-cols-2 gap-3'>
        <form
          className='p-4 grid'
          method='POST'
          onSubmit={(event) => {
            selectFile >= 1 ? handleSubmitPhoto(event) : event.preventDefault();
          }}
        >
          <div className='grid grid-cols-1 gap-3'>
            <h1 className='2xl:text-3xl xl:text-3xl lg:text-2xl md:text-2xl font-bold m-4'>
              Photo settings
            </h1>

            <input
              id='file'
              type='file'
              className='hidden'
              onChange={(e) => setSelectFile(e.target.files[0])}
            />
            <label
              for='file'
              className='2xl:text-3xl xl:text-3xl lg:text-2xl md:text-2xl mb-2 mt-2 border-2 border-solid border-red-200 transition ease-in-out hover:bg-red-400  focus:ring focus:outline-none focus:ring-red-600 p-2 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/3 rounded-lg hover:text-white'
            >
              Select photo...
            </label>
            <button
              className='p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/3 transition'
              onClick={handleSubmitPhoto}
            >
              Set photo
            </button>
          </div>
        </form>
        {dataFile()}{' '}
        <form className='p-4 border-l-4 border-red-600 '>
          <div className='grid grid-cols-1 gap-3'>
            <h1 className='2xl:text-3xl xl:text-3xl lg:text-2xl md:text-2xl font-bold m-4'>{`Delete photo profile: ${user?.username}`}</h1>
            <button
              id='del'
              className='p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/3 transition'
              onClick={delPhoto}
            >
              Delete photo
            </button>
          </div>
        </form>{' '}
      </div>
    </div>
  );
}
