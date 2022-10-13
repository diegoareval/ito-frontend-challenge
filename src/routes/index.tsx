import {useEffect} from 'react';
import {
  Routes as RoutesReact,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import LoginPage from 'pages/login';
import BooksPage from 'pages/home';
import FavoritePage from 'pages/favoriteMovie';
import NotFoundPage from 'pages/404';
import MovieDetailPage from 'pages/detailPage';
import {useAuth} from 'context/auth';

import {ROUTES} from './paths';

function RequireAuth({children}: { children: JSX.Element }) {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (!user && !loading) {
    return <Navigate to={ROUTES.LOGIN} state={{from: location}} replace/>;
  }

  return children;
}

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.NOT_FOUND, {replace: true});
  }, [navigate]);

  return null;
};

const Routes = () => {
  return (
    <RoutesReact>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
      <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
      <Route
        path={ROUTES.HOME}
        element={
          <RequireAuth>
            <BooksPage/>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.FAVORITE}
        element={
          <RequireAuth>
            <FavoritePage/>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.MOVIE_DETAIL}
        element={
          <RequireAuth>
            <MovieDetailPage/>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Redirect/>}/>
    </RoutesReact>
  );
};

export default Routes;
