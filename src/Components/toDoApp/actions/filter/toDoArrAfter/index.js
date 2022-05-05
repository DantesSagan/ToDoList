import { Link } from 'react-router-dom';
import { formatTime } from '../../../indexConst';

export const ToDoArrAfter = ({ disNameArray, user, formatTimeCreatedAt }) => {
  return Object.keys(disNameArray).map((item, index) => {
    // console.log(getNestedToDo(setToDoSArray, disNameArray, item));
    return Object.keys(disNameArray[item]).map((ind) => {
      const sortingByAsc = disNameArray[item][ind].doneToDo === true;
      console.log(sortingByAsc);

      const doneEqualToTrue =
        user?.username === disNameArray[item][ind].displayName && sortingByAsc;

      return (
        <div
          className='justify-center bg-white rounded-xl hover:bg-red-600 hover:text-white shadow-inner mb-2 dashboardPage borderHover'
          key={index}
        >
          {doneEqualToTrue && (
            <div>
              {disNameArray[item][ind].untilTime === formatTime() ||
              disNameArray[item][ind].untilTime < formatTime() ? (
                <Link to={`/todolist/${disNameArray[item][0].toDoID}`}>
                  <p className='text-3xl p-4 title'>
                    Задание просрочено!|Time is out for task - <br />
                    <span className='bg-red-500 rounded-lg'>
                      {disNameArray[item][ind].untilTime}
                    </span>{' '}
                    {` `}= {formatTime()}
                  </p>
                </Link>
              ) : disNameArray[item][ind].untilTime === 0 ? (
                <Link
                  to={`/todolist/${disNameArray[item][0].toDoID}`}
                  key={item.id}
                >
                  {' '}
                  <div className='text-3xl font-bold p-4 title' key={item.id}>
                    {disNameArray[item][0].title} <br key={item.id} />
                  </div>
                  <hr
                    className='border border-red-600 ml-4 mr-4 m-2'
                    key={item.id}
                    id='hrr'
                  />
                  <div className='text-1xl p-4' key={item.id}>
                    {disNameArray[item][0].doneToDo ? (
                      <s className='opacity-50'>
                        {disNameArray[item][0].toDo} <br key={item.id} />
                      </s>
                    ) : (
                      <div>
                        {' '}
                        <div>
                          {disNameArray[item][0].toDo instanceof Array ? (
                            <ul>
                              {Object.keys(disNameArray[item][0].toDo).map(
                                (toDoIndex) => {
                                  return (
                                    <li className='p-1 hover:underline'>
                                      {disNameArray[item][0].toDo[toDoIndex]}{' '}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          ) : (
                            disNameArray[item][0].toDo
                          )}
                        </div>{' '}
                        <br key={item.id} />
                      </div>
                    )}
                  </div>
                  {` `}
                </Link>
              ) : (
                <Link
                  to={`/todolist/${disNameArray[item][0].toDoID}`}
                  key={item.id}
                >
                  {' '}
                  <div className='text-3xl font-bold p-4 title' key={item.id}>
                    {disNameArray[item][0].title} <br key={item.id} />
                  </div>
                  <hr
                    className='border border-red-600 ml-4 mr-4 m-2'
                    key={item.id}
                    id='hrr'
                  />
                  <div className='text-1xl p-4' key={item.id}>
                    {disNameArray[item][0].doneToDo ? (
                      <s className='opacity-50'>
                        {disNameArray[item][0].toDo} <br key={item.id} />
                      </s>
                    ) : (
                      <div>
                        {' '}
                        <div>
                          {disNameArray[item][0].toDo instanceof Array ? (
                            <ul>
                              {Object.keys(disNameArray[item][0].toDo).map(
                                (toDoIndex) => {
                                  return (
                                    <li className='p-1 hover:underline'>
                                      {disNameArray[item][0].toDo[toDoIndex]}{' '}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          ) : (
                            disNameArray[item][0].toDo
                          )}
                        </div>{' '}
                        <br key={item.id} />
                      </div>
                    )}
                  </div>
                  {` `}
                </Link>
              )}
            </div>
          )}
        </div>
      );
    });
  });
};
