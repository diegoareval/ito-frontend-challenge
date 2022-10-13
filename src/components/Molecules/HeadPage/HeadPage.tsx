import { ReactNode } from 'react';
import Text from 'components/Atoms/Text';

import Title from 'components/Atoms/Title';
import { HeadPageContent, HeadPageStyle} from './style';

interface HeadPageProps {
  title: string;
  description?: string;
  extra?: ReactNode;
  notAdd?: boolean;
  onAdd?: () => void | Promise<void>;
  onRefresh?: () => void | Promise<void>;
}

const HeadPage = ({
  title,
  description,
  onAdd,
  extra,
  onRefresh,
  notAdd = false,
}: HeadPageProps) => {

  return (
    <HeadPageStyle>
      <HeadPageContent>
        <Title color="white">{title}</Title>
        {description && <Text>{description}</Text>}
      </HeadPageContent>
    </HeadPageStyle>
  );
};

export default HeadPage;
