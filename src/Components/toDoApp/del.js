const db = firebase.firestore();
const parentDocReferences = [];
const deletedParentDocIds = [];

db.collectionGroup('MySubcollection')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      console.log(doc.ref.parent.parent.path);
      parentDocReferences.push(db.doc(doc.ref.parent.parent.path).get());
    });
    return Promise.all(parentDocReferences);
  })
  .then((docSnapshots) => {
    docSnapshots.forEach((doc) => {
      console.log(doc.id);
      console.log(doc.exists);
      if (!doc.exists && deletedParentDocIds.indexOf(doc.id) === -1) {
        deletedParentDocIds.push(doc.id);
      }
    });

    // Use the deletedParentDocIds array
    // For example, get all orphan subcollections reference in order to delete all the documents in those collections (see https://firebase.google.com/docs/firestore/manage-data/delete-data#collections)
    deletedParentDocIds.forEach((docId) => {
      const orphanSubCollectionRef = db.collection(
        `MyCollection/${docId}/MySubcollection`
      );
      // ...
    });
  });
