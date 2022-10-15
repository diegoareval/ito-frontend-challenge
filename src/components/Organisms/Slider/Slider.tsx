import useModal from 'hooks/useModal';
import { Grid } from 'components/Molecules/Grid';
import ModalConfirm from 'components/Molecules/Modals/ModalConfirm';
import CardMovie from 'components/Molecules/CardMovie';
import Slider from "react-slick";
import { StyleWrapper } from './style';
import Title from '../../Atoms/Title';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BookProps {
  items: MovieItemProps[];
  favoriteScreen?: boolean,
  refetchData: () => void;
}

const SliderItem = ({ items, favoriteScreen = false, refetchData }: BookProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
  };

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
            <Slider {...settings}>
            {items.map((item) => (
              <div style={{ margin: "30px"}}>
                <Grid.Col key={item.id}>
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
              </div>
            ))}
          </Slider>
        )}
      </StyleWrapper>

      <ModalConfirm
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};
export default SliderItem;
