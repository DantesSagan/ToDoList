// userId: D5psSVAkNWPhReliPnnFPuFGoex1
export function seedDatabse(firebase) {
  const users = [
    {
      country: 'Russia',
      city: 'Ufa',
      gender: 'male',
      phoneNumber: '+79188866923',
      userId: 'D5psSVAkNWPhReliPnnFPuFGoex1',
      username: 'alex',
      fullName: 'Alex Mikh',
      emailAddress: 'mihaleksval@gmail.com',
      dateCreated: Date.now(),
    },
    {
      country: 'Sweden',
      city: 'Stockholm',
      gender: 'female',
      phoneNumber: '+71111111111',
      userId: 'g1yEHRBmhsb5NZs3MC3Kcqf1Zwt1',
      username: 'Violetta',
      fullName: 'Bjornsson',
      emailAddress: 'bj@gmail.com',
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 10; ++i) {
    try {
      for (let username = 1; username <= 10; ++username) {
        firebase
          .firestore()
          .collection('todos')
          .add({
            toDosId: i,
            userId: '1',
            titleOfToDo: 'CreateApp',
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
            imageSrc: `/images/users/${username}/${i}.jpg`,
            dateCreated: Date.now(),
          });
      }
      console.log('data seed was successful');
    } catch (error) {
      console.log(error, ' fetch database was failed');
    }
  }
}
