import React from 'react';
import HomeNavigation from '~/Navigation/HomeNavigation';
import AuthNavigation from '~/Navigation/AuthNavigation';

const NavController = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <HomeNavigation /> : <AuthNavigation />;
};

export default NavController;
