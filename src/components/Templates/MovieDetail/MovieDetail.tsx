import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';
import {CardMovie} from '../../Molecules/CardMovie';
import {ROUTES} from '../../../routes/paths';
import Button from '../../Atoms/Button';

const DetailTemplate = () => {
  const {id} = useParams();

  const {toggleModal} = useModal();

  const {detail: data, loading, getData} = useQueryFetch<MovieItemProps[]>({
    path: `${id}`,
  });

  useEffect(() => {
  }, [id])

  const toggle = () => {
    toggleModal();
  };
  return (
    <>
      <HeadPage
        onAdd={toggle}
        onRefresh={getData}
        title="Check out movie details"
        description=""
      />

      <Link
        to={ROUTES.HOME}
        style={{display: 'block', textAlign: 'center', marginBottom: "30px"}}
      >
        <Button>Go to home</Button>
      </Link>

      {!loading ? (
        // eslint-disable-next-line react/jsx-no-undef
        <CardMovie
          favoriteScreen={false} title={data.title}
          id={data.id} vote_average={data.vote_average}
          release_date={data.release_date}
          overview={data.overview} backdrop_path={data.backdrop_path}/>
      ) : (
        <Loading/>
      )}

    </>
  );
};

export default DetailTemplate;
