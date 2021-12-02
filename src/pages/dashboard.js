import React from 'react';
import AppMain from '../Components/AppMain';
import NavBarAndHeader from '../main/navBar';
import PropTypes from 'prop-types';

export default function Dashboard() {
  return (
    <div className='text-center '>
      <NavBarAndHeader />
      <AppMain />
    </div>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
