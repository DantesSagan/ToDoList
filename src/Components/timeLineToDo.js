import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';

import LoggedInUserContext from '../context/logged-in-user';
import TodoApp from './toDoApp';
import useToDo from '../hooks/use-todos';

export default function TimeLine() {
  const { user } = useContext(LoggedInUserContext);
  const { toDoS } = useToDo(user);

  return (
    <div className='container col-span-2'>
      {!toDoS ? (
        <>
          <Skeleton
            animation='wave'
            count={4}
            width={640}
            height={640}
            className='mb-10'
          />
        </>
      ) : (
        toDoS.map((content) => (
          <TodoApp key={content.docId} content={content} />
        ))
      )}
    </div>
  );
}
