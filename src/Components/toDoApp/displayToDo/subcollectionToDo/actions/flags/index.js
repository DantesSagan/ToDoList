import { getDocs, collection, updateDoc } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { getNestedToDo } from '../../../../../../services/firebase';

import UserContext from '../../../../../../context/user';
import useUser from '../../../../../../hooks/user';

export default function FlagsSub({
  firebaseLib,
  nestedToDoArray,
  colors,
  setNestedArrayToDo,
  setArrayID,
}) {
  const { user: loggedIn } = useContext(UserContext);
  const { user } = useUser(loggedIn?.uid);

  useEffect(() => {
    try {
      getNestedToDo(setNestedArrayToDo, setArrayID);
    } catch (error) {
      setNestedArrayToDo([]);
      console.log(error);
    }
  }, []);

  const handleSubFlags = async () => {
    return Object.keys(nestedToDoArray).map(async (itemsNested) => {
      // console.log(nestedArrayToDo);
      //  4th
      return Object.keys(nestedToDoArray[itemsNested]).map(async (index) => {
        // Need to create comparison what will be strict-equal
        // by router toDoID in compar with toDoID in toDosArray
        let comparisonName =
          user?.username === nestedToDoArray[itemsNested][index].displayName;

        // This is check if currentURL and RouterPath strict-equal
        // To undestand what u want to delete in current equl parameters of URL
        let getCurrentUrl = window.location.pathname;
        let getRouterPathToDo = `/todolist/nested/subcollection/${nestedToDoArray[itemsNested][index].toDoID}`;

        let checkPathID = getCurrentUrl === getRouterPathToDo;
        // This is check if currentURL and RouterPath strict-equal
        // So do confirm what u want to delete whole toDoList with all data in it

        const getDocSubToDoOnes = await getDocs(
          collection(firebaseLib.firestore(), 'todos')
        );

        return checkPathID
          ? getDocSubToDoOnes.forEach(async (getDoc) => {
              let getID = getDoc.id;

              let checkID =
                getID === nestedToDoArray[itemsNested][index].parentID;

              const getDocTodos = await getDocs(
                collection(
                  firebaseLib.firestore(),
                  'todos',
                  getID,
                  'nestedToDo'
                )
              );

              return comparisonName && checkPathID && checkID
                ? getDocTodos.forEach((doc) => {
                    let comparisonID =
                      doc.id === nestedToDoArray[itemsNested][index].toDoID;
                    // In this case need to compare two equal parameters
                    // for find user who create toDo
                    // And second compare with if - user - IS loggedIn
                    // and this - currentUser - strict-equal to displayName in toDosArray
                    // So updateDoc of toDoList otherwise - no
                    //         const confirm = window.confirm(
                    //           `Are you sure you want to update this toDo =
                    // ${nestedToDoArray[itemsNested][index].importance}? `
                    //         );
                    //         if (
                    //           confirm &&
                    //           checkPathID &&
                    //           checkID &&
                    //           comparisonID &&
                    //           comparisonName
                    //         ) {
                    //           console.log('Deleted');
                    //         } else {
                    //           console.log(
                    //             'error change, ошибка в подтверждении изменения важности туду листа'
                    //           );
                    //           return null;
                    //         }
                    return comparisonID ? (
                      updateDoc(doc.ref, {
                        toDosArray: [
                          {
                            displayName:
                              nestedToDoArray[itemsNested][index].displayName,
                            createdAt:
                              nestedToDoArray[itemsNested][index].createdAt,
                            toDo: nestedToDoArray[itemsNested][index].toDo,
                            toDoID: nestedToDoArray[itemsNested][index].toDoID,
                            parentID:
                              nestedToDoArray[itemsNested][index].parentID,
                            userId: nestedToDoArray[itemsNested][index].userId,
                            doneToDo:
                              nestedToDoArray[itemsNested][index].doneToDo,
                            untilTime:
                              nestedToDoArray[itemsNested][index].untilTime,
                            importance: colors,
                          },
                        ],
                      })
                        .then(() => {
                          // navigate(ROUTES.DASHBOARD);
                          console.log(
                            'Flags importance changed successfully: ',
                            colors
                          );
                        })
                        .catch((error) => {
                          console.error(
                            'Error with flags importance changed: ',
                            error
                          );
                        })
                        .then(() => {
                          window.location.reload();
                        })
                    ) : (
                      <div>{`Cannot update this ${nestedToDoArray[itemsNested][index].importance}`}</div>
                    );
                  })
                : null;
            })
          : null;
      });
    });
  };
  return { handleSubFlags };
}
