export default function DeletePhoto({
  getStorage,
  ref,
  fullPath,
  deleteObject,
}) {
  const delPhoto = () => {
    const storage = getStorage();
    // Create a reference to 'images/someName.jpg'
    const getUsersImagesRef = ref(
      storage,
      `${fullPath}.png` || `${fullPath}.jpg` || `${fullPath}.jpeg`
      // + selectFile.name
    );
    // Delete the file
    deleteObject(getUsersImagesRef)
      .then((del) => {
        // File deleted successfully
        if (del) {
          console.log(`File deleted successfully: `, del);
          const img = document.getElementById('del');
          img.setAttribute('onclick', del);
        } else {
          return null;
        }
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };
  return {
    delPhoto,
  };
}
