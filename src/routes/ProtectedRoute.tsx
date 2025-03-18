import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import RoutesApp from '../constants/routes';
import { useTypedSelector } from '../redux';
import { accessTokenSelector } from '../redux/selectors/share-selector';

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useTypedSelector(accessTokenSelector);

  return accessToken ? children : <Navigate to={RoutesApp.Login} replace />;
};