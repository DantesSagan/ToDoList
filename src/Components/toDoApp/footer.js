import PropTypes from 'prop-types';

export default function Footer({ title, user: displayName }) {
  return (
    <div className='p-4 pt-2 pb-0'>
      <span className='mr-1 font-bold'>{displayName}</span>
      <span>{title}</span>
    </div>
  );
}

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};
