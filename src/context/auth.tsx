import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PATHS from 'utils/paths';
import storage from 'services/storage';
import fetch from 'services/fetchInstance';
import useQueryFetch from 'hooks/useQueryFetch';
import {useLocalStorage} from '../hooks/useLocalStorage';
import {MovieItemProps} from '../interfaces/movie.interface.props';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserReq {
  email: string;
  password?: string;
}

interface LoginReturn {
  data: User | null;
  error: string | null;
}

interface AuthContextProps {
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (values: UserReq) => Promise<LoginReturn>;
  logout: () => void;
  favoriteMovies: MovieItemProps[]
  setFavorite: (key: string, item: MovieItemProps) => void;
  removeFromLocalStorage: (key: string, id: string) => void;
}

const defaultValue: AuthContextProps = {
  user: null,
  error: null,
  loading: true,
  favoriteMovies: [],
  login: () => Promise.resolve({ data: null, error: null }),
  logout: () => {},
  setFavorite: (key: string, MovieItemProps)=> {},
  removeFromLocalStorage: (key: string, id: string)=> {}
};

const AuthContext = createContext<AuthContextProps>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

const storageKey = '@auth';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filters = useMemo(() => {
    return [
      {
        key: 'state',
        value: 'requested',
      }
    ]
  }, [user?.id])

  const { favorites, setFavorite, removeFromLocalStorage } = useLocalStorage("favorites");
  console.log("favorites", favorites)

  const { data, getData } = useQueryFetch<MovieItemProps[]>({
    path: PATHS.POPULAR,
    skip: !user,
    filters
  })

  const onLogin = useCallback(async (values: UserReq) => {
    let textError = '';
    setError('');
    setIsLoading(true);
    try {
      const { data } = await fetch.post<User | null>('/login', values);
      setIsLoading(false);
      setUser(data);
      storage.set(storageKey, data, true);
      return { data, error: null };
    } catch (err: any) {
      // eslint-disable-next-line no-console
      textError = err?.response?.data?.message || err?.message || '';
      setError(textError);
    }
    setIsLoading(false);
    return { data: null, error: textError };
  }, []);

  const onLogout = useCallback(() => {
    setError('');
    setUser(null);
    storage.remove(storageKey);
  }, []);

  useEffect(() => {
    const user = storage.get(storageKey, true);
    if (user) {
      setUser(user as User);
    }
    setIsLoading(false);
  }, []);

  const output = useMemo(() => {
    return {
      user,
      error,
      logout: onLogout,
      login: onLogin,
      setFavorite,
      removeFromLocalStorage,
      loading: isLoading,
      favoriteMovies: favorites || [],
    };
  }, [user, error, isLoading, onLogin, onLogout, data,favorites, getData]);

  return <AuthContext.Provider value={output}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
