import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { BsArrowsMove } from 'react-icons/bs';

import { ROUTES } from 'routes/paths';
import { useAuth } from 'context/auth';
import useModal from 'hooks/useModal';
import Text from 'components/Atoms/Text';

import {
  StyleBrandWrapper,
  StyleBurgerMobile,
  StyleFlex,
  StyleLink,
  StyleMenuBody,
  StyleMenuClose,
  StyleMenuWrapper,
  StyleNav,
} from './style';

interface MenuProps {
  toggle?: () => void;
  logout?: () => void;
  countReq?: number | null;
}

const Menu = ({ toggle, logout, countReq }: MenuProps) => (
  <>
    <NavLink
      to={ROUTES.HOME}
      onClick={toggle}
      className={({ isActive }) => (isActive ? 'link-active' : '')}
    >
      <StyleLink bgColor="transparent" labelColor="white">
        Movies
      </StyleLink>
    </NavLink>

    <NavLink
      to={ROUTES.FAVORITE}
      onClick={toggle}
      className={({ isActive }) => (isActive ? 'link-active' : '')}
    >
      <StyleLink bgColor="transparent" labelColor="white">
        Favorites {typeof countReq === 'number' && <span className="app-count">{countReq}</span>}
      </StyleLink>
    </NavLink>


    <StyleLink
      onClick={logout}
      labelColor="error"
      bgColor="errorOpacity"
      style={{ paddingLeft: 10, paddingRight: 10 }}
    >
      Logout
    </StyleLink>
  </>
);

const Navbar = () => {
  const { isOpen, toggleModal } = useModal();
  const { logout, favoriteMovies } = useAuth();



  return (
    <StyleNav>
      <Link to={ROUTES.HOME}>
        <StyleBrandWrapper>
          <BsArrowsMove />
          <Text size={24} color="white" fontWeight="700">
            Movie
          </Text>
        </StyleBrandWrapper>
      </Link>

      <StyleFlex>
        <Menu
          logout={logout}
        />
      </StyleFlex>

      <StyleBurgerMobile bgColor="transparent" onClick={toggleModal}>
        <BiMenu />
      </StyleBurgerMobile>

      {isOpen && (
        <StyleMenuWrapper>
          <StyleMenuBody>
            <StyleMenuClose onClick={toggleModal}>
              <BsArrowsMove />
            </StyleMenuClose>

            <StyleBrandWrapper className="mb-3">
              <BsArrowsMove />
              <Text size={24} color="white" fontWeight="700">
                Library
              </Text>
            </StyleBrandWrapper>

            <Menu
              logout={logout}
              toggle={toggleModal}
              countReq={favoriteMovies.length || 0}
            />
          </StyleMenuBody>
        </StyleMenuWrapper>
      )}
    </StyleNav>
  );
};

export default Navbar;
