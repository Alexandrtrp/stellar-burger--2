/* eslint-disable arrow-body-style */
import { Preloader } from '@ui';

import { Navigate, replace, useLocation } from 'react-router';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router';
import { FC, useEffect, useLayoutEffect } from 'react';
import { redirect } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // if (isAuthenticated) {
  //   <Navigate to={'/profile'} />;
  // }
  return children;
};
