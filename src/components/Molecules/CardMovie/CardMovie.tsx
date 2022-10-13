import Text from 'components/Atoms/Text';
import Button from 'components/Atoms/Button';
import {
  StyleBookContent,
  StyleBookImage,
  StyleBookCard,
  StyleBookBody,
  StyleNav,
  StyleImageWrapper,
  StyleImage,
  StyleInfo,
} from './style';
// eslint-disable-next-line import/no-cycle
import {useAuth} from '../../../context/auth';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';

export const CardMovie = ({
  title,backdrop_path,
       release_date,
                           overview,
                           vote_average, favoriteScreen = false
}: MovieItemProps) => {

  const { setFavorite } = useAuth();
  return (
    <StyleBookCard>
      <StyleBookBody>
        {/* image */}
        <StyleBookImage>
          <StyleImageWrapper>
            <StyleImage loading="lazy" src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="" />
          </StyleImageWrapper>
        </StyleBookImage>
        {/* end image */}

        <StyleBookContent>
          <StyleNav>
            <Text fontWeight="600" size={20} lineHeight={30} title={title}>
              {title}
            </Text>
            <Text size={16} lineHeight={26} color="darkNine">
              <b>Vote Average:</b> {vote_average}
            </Text>
            <Text size={16} lineHeight={26} color="darkNine">
              <b>Year:</b> {release_date}
            </Text>

            <StyleInfo>

              <Text className="ml-1" size={16} lineHeight={26} color="white">
                <b>Available:</b> {overview}
              </Text>
            </StyleInfo>
            {
              !favoriteScreen &&  <Button loading={false} onClick={()=> setFavorite("favorites",{ title,backdrop_path,
                release_date,
                overview,
                vote_average})}>
                Save as Favorite
              </Button>
            }


          </StyleNav>
        </StyleBookContent>
      </StyleBookBody>
    </StyleBookCard>
  );
};

export default CardMovie;
