import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebaseContext';

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );
  
  const { firebaseLib } = useContext(FirebaseContext);
  useEffect(() => {
    const listener = firebaseLib.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    }); 
    return () => listener();
  }, [firebaseLib]);
  return { user };
}
