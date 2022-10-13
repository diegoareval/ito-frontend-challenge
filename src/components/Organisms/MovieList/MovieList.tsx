import useModal from 'hooks/useModal';
import { Grid } from 'components/Molecules/Grid';
import ModalConfirm from 'components/Molecules/Modals/ModalConfirm';
import CardMovie from 'components/Molecules/CardMovie';
import { StyleWrapper } from './style';
import Title from '../../Atoms/Title';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';

interface BookProps {
  items: MovieItemProps[];
  favoriteScreen?: boolean,
  refetchData: () => void;
}

const MovieList = ({ items, favoriteScreen = false, refetchData }: BookProps) => {
  const { isOpen, toggleModal } = useModal();
  return (
    <>
      <StyleWrapper>
        {!items.length ? (
          <Title
            size={30}
            align="center"
            color="gradientText"
            style={{ marginTop: 50 }}
          >
            Not data
          </Title>
        ) : (
          <Grid.Row gutter={[{ sm: 0, md: 30 }, { sm: 30 }]}>
            {items.map((item) => (
              <Grid.Col key={item.id} sm={24} md={12}>
                <CardMovie
                  id={item.id}
                  backdrop_path={item.backdrop_path}
                  title={item.title}
                  release_date={item.release_date}
                  overview={item.overview}
                  vote_average={item.vote_average}
                  favoriteScreen={favoriteScreen}
                />
              </Grid.Col>
            ))}
          </Grid.Row>
        )}
      </StyleWrapper>

      <ModalConfirm
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};
export default MovieList;
