import PropTypes from 'prop-types';

export default function Footer({ titleOfToDo, username }) {
  return (
    <div className='p-4 pt-2 pb-0'>
      <span className='mr-1 font-bold'>{username}</span>
      <span>{titleOfToDo}</span>
    </div>
  );
}

Footer.propTypes = {
  titleOfToDo: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
