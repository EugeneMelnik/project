import { Navigate, Route, Routes } from 'react-router-dom';
import React, { FC, ReactElement } from 'react';
import RoutesApp from '../constants/routes';
import { RootPage } from '../pages/RootPage/RootPage';
import { LoginPage } from '../pages/auth/LoginPage/LoginPage';
import { SignUpPage } from '../pages/auth/SignUpPage/SignUpPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { CollectionsPage } from '../pages/CollectionsPage/CollectionsPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { ProtectedRoute } from './ProtectedRoute';
import { CollectionPage } from '../pages/CollectionPage/CollectionPage';
import { ItemPage } from '../pages/ItemPage/ItemPage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { AdminPage } from '../pages/AdminPage/AdminPage';
import { UserPage } from '../pages/UserPage/UserPage';
import { useTypedSelector } from '../redux';
import { userRoleSelector } from '../redux/selectors/user-selector';

const AdminRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const role = useTypedSelector(userRoleSelector);
  return role === 'Admin' ? children : <Navigate to={RoutesApp.Root} replace />;
};

export const AppRoutes: FC = () => (
  <Routes>
    <Route path={RoutesApp.Login} element={<LoginPage />} />
    <Route path={RoutesApp.SignUp} element={<SignUpPage />} />
    <Route
      path={RoutesApp.Root}
      element={
        <ProtectedRoute>
          <RootPage />
        </ProtectedRoute>
      }
    >
      <Route index element={<HomePage />} />
      <Route
        path={RoutesApp.Profile}
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path={RoutesApp.Collection} element={<CollectionPage />} />
      <Route path={RoutesApp.Item} element={<ItemPage />} />
      <Route path={RoutesApp.Search} element={<SearchPage />} />
      <Route path={RoutesApp.User} element={<UserPage />} />
      <Route path={RoutesApp.Admin} element={<AdminRoute><AdminPage /></AdminRoute>} />
    </Route>
    <Route
      path={RoutesApp.Home}
      element={
        <ProtectedRoute>
          <RootPage />
        </ProtectedRoute>
      }
    >
      <Route
        index
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route
      path={RoutesApp.Collections}
      element={
        <ProtectedRoute>
          <RootPage />
        </ProtectedRoute>
      }
    >
      <Route
        index
        element={
          <ProtectedRoute>
            <CollectionsPage />
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>
);
