// userId: D5psSVAkNWPhReliPnnFPuFGoex1
export function seedDatabse(firebase) {
  const users = [
    {
      country: 'Russia',
      phoneNumber: '+7918886692',
      userId: 'D5psSVAkNWPhReliPnnFPuFGoex1',
      username: 'alex',
      fullName: 'Alex Mikh',
      emailAddress: 'mihaleksval@gmail.com',
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 10; ++i) {
    for (let username = 1; username <= 10; ++username) {
      firebase
        .firestore()
        .collection('todos')
        .add({
          toDosId: i,
          userId: '1',
          titleOfToDo: 'CreateApp',
          likes: [],
          toDosAdditional: [
            {
              title: '2nd',
              toDo: 'Get 2nd todo',
            },
            {
              title: '3d',
              toDo: 'Get 3d todo',
            },
          ],
          dateCreated: Date.now(),
        });
    }
  }
}
