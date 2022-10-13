import Text from 'components/Atoms/Text';
import Title from 'components/Atoms/Title';
import Login from 'components/Organisms/Login';

import { StyleBrandWrapper, LoginWrapperStyle, StyleContent } from './style';
import HeaderTitle from '../../Molecules/HeaderTitle';

const LoginTemplate = () => {
  return (
    <LoginWrapperStyle>
      <StyleBrandWrapper>
        <HeaderTitle title="Movie" />
      </StyleBrandWrapper>

      <StyleContent>
        <Title color="white" align="center">
          Login
        </Title>
        <Text color="white" align="center">
         Sign in and checkout your movies
        </Text>

        {/* login form */}
        <Login />
        {/* end login form */}
      </StyleContent>
    </LoginWrapperStyle>
  );
};

export default LoginTemplate;
