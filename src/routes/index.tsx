import { Route, Routes } from 'react-router-dom';
import React, { FC } from 'react';
import RoutesApp from '../constants/routes';
import LoginPageContainer from '../auth/LoginPage/LoginPageContainer';
import SignUpPageContainer from '../auth/SignUpPage/SignUpPageContainer';
import RootPage from '../core/RootPage/RootPage';
import AdminPageContainer from '../pages/AdminPage/AdminPageContainer';
import HomePageContainer from '../pages/HomePage/HomePageContainer';
import UserPageContainer from '../pages/UserPage/UserPageContainer';
import CollectionPageContainer from '../pages/CollectionPage/CollectionPageContainer';
import CollectionsPageContainer from '../pages/CollectionsPage/CollectionsPageContainer';
import SearchPageContainer from '../pages/SearchPage/SearchPageContainer';

interface IAppRoutes {
  toggleLike: (userId: number, itemId: number) => void;
}

const AppRoutes: FC<IAppRoutes> = ({ toggleLike }) => (
  <Routes>
    <Route path={RoutesApp.Login} element={<LoginPageContainer />} />
    <Route path={RoutesApp.SignUp} element={<SignUpPageContainer />} />
    <Route path={RoutesApp.Root} element={<RootPage />}>
      <Route path={RoutesApp.Admin} element={<AdminPageContainer />} />
      <Route
        path={RoutesApp.Home}
        element={<HomePageContainer toogleLike={toggleLike} />}
      />
      <Route path={RoutesApp.User} element={<UserPageContainer />} />
      <Route
        path={RoutesApp.Collection}
        element={<CollectionPageContainer toogleLike={toggleLike} />}
      />
      <Route
        path={RoutesApp.Collections}
        element={<CollectionsPageContainer />}
      />
      <Route
        path={RoutesApp.Search}
        element={<SearchPageContainer toogleLike={toggleLike} />}
      />
    </Route>
  </Routes>
);

export default AppRoutes;
