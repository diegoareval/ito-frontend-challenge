import { Link } from "react-router-dom";
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
import {useAuth} from '../../../context/auth'
import {MovieItemProps} from '../../../interfaces/movie.interface.props';


export const CardMovie = ({
  title,backdrop_path,
       release_date,id,
                           overview,
                           vote_average, favoriteScreen = false
}: MovieItemProps) => {
  const { setFavorite, removeFromLocalStorage } = useAuth();

  const markAsFavorite = (item: MovieItemProps)=> {
    setFavorite("favorites", item);
    alert('added as favorite!')
  }

  const removeAsFavorite = (id: string)=> {
    removeFromLocalStorage("favorites", id)
    alert('removed as favorite!')
  }

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
            <Link to={`/movie/${id}`} style={{textDecoration: "none", cursor: "pointer"}}>
              <Text fontWeight="600" size={20} lineHeight={30} title={title}>
                {title}
              </Text>
            </Link>

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
              !favoriteScreen ?  <Button loading={false} onClick={()=> markAsFavorite({ title,backdrop_path,
                release_date,
                overview,
                vote_average, id})}>
                Save as Favorite
              </Button>:
                <Button loading={false} onClick={()=> removeAsFavorite(id)}>
                  Remove from Favorite
                </Button>
            }


          </StyleNav>
        </StyleBookContent>
      </StyleBookBody>
    </StyleBookCard>
  );
};

export default CardMovie;
