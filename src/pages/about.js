import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <section className='relative h-screen text-center mx-auto profile bgAbout'>
      <div
        className='absolute inset-0 inset-y-44'
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <h1 className='text-3xl font-bold'>About page</h1>
        <br />
        <h2 className='text-2xl font-bold'>
          This is a project called ToDoList
        </h2>
        <br />
        <p className='text-lg'>
          Main idea of this project is registration you own account and
          organized <br />
          you time with lists of ToDo
        </p>
        <br />
        <h3 className='text-2xl font-bold'>Used frameworks and libraries</h3>
        <ol className='text-center text-lg list-decimal inline-block'>
          <li></li>
          <li className='text-left'>React.js</li>
          <li className='text-left'>Firebase</li>
          <li className='text-left'>React-router-dom</li>
          <li className='text-left'>React-loader-spinner</li>
          <li className='text-left'>Styled component</li>
          <li className='text-left'>Material icons</li>
        </ol>
        <i className='text-center text-black flex m-auto pt-6 pb-6'>
          <strong className='font-bold text-center flex m-auto p-2 bg-black hover:bg-red-600 border border-bg-black hover:border-black rounded-lg transition duration-300 text-white'>
            <a href='https://github.com/DantesSagan/ToDoList'>
              {' '}
              Coded by @DantesSagan
            </a>
          </strong>
        </i>
        <button
          onClick={() => navigate(-1)}
          className='text-center flex m-auto p-4 bg-black hover:bg-red-600 border border-bg-black hover:border-black rounded-lg transition duration-300 text-white'
        >
          Back
        </button>
      </div>
    </section>
  );
}
