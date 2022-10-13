import Lottie from 'react-lottie';
import animationData from './animate/lego.json';
// styles
import { StyleLoading } from './style';

interface LoadingProps {
  className?: string;
}

const Loading = (props: LoadingProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <StyleLoading {...props}>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />
    </StyleLoading>
  );
}

export default Loading;
