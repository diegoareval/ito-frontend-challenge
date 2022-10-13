import PATHS from 'utils/paths';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import MovieList from 'components/Organisms/MovieList';
import {useAuth} from '../../../context/auth';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';

const HomeTemplate = () => {
  const { toggleModal, isOpen } = useModal();
  const { favoriteMovies } = useAuth();
  const {  loading, getData } = useQueryFetch<MovieItemProps[]>({
    path: PATHS.POPULAR,
  });


  const toggle = () => {
    toggleModal();
  };

  return (
    <>
      <HeadPage
        onAdd={toggle}
        onRefresh={getData}
        title="List of Favorites Movies"
        description=""
      />


      {!loading ? (
        <MovieList
          favoriteScreen
          refetchData={getData}
          items={favoriteMovies ?? []}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomeTemplate;
