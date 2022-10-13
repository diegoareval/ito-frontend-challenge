import Text from 'components/Atoms/Text';
import {BsArrowsMove} from 'react-icons/bs';

interface HeadTitleProps {
  title: string;
}

const HeaderTitle = ({
                    title,
                  }: HeadTitleProps) => {

  return (
   <>
     <BsArrowsMove />
     <Text size={24} color="white" fontWeight="700">
       {title}
     </Text>
   </>
  );
};

export default HeaderTitle;
