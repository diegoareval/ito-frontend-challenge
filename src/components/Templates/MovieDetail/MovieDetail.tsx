import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';
import {CardMovie} from '../../Molecules/CardMovie';
import {ROUTES} from '../../../routes/paths';
import Button from '../../Atoms/Button';
import Title from '../../Atoms/Title';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderItem from '../../Organisms/Slider';

const DetailTemplate = () => {
  const {id} = useParams();

  const {toggleModal} = useModal();

  const {detail: data, loading, getData} = useQueryFetch<MovieItemProps[]>({
    path: `/movie/${id}`,
  });

  const {data: recommendations, loading: loadingRecommendations, getData: fetchRecommendations} = useQueryFetch<MovieItemProps[]>({
    path: `/movie/${id}/recommendations`,
  });


  useEffect(() => {
    getData().then()
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

      <Title
        size={30}
        align="center"
        color="white"
        style={{ marginTop: 50 }}
      >
        Recommendations:
      </Title>

      <SliderItem refetchData={getData}
                  items={recommendations.results ?? []}/>

    </>
  );
};

export default DetailTemplate;
