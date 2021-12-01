import AppMain from './Components/AppMain';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import './App.css';

export default function App() {
  const user = useAuthListener();
  return (
    <div className='App mt-24 text-center text-3xl'>
      <UserContext.Provider value={{ user }}>
        <AppMain />
      </UserContext.Provider>
    </div>
  );
}
