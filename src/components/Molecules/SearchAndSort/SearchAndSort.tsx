import { StyleSearch, StyleWrapper } from './style';

interface SearchAndSortProps {
  placeholder?: string;
  onSearch?: (value?: string) => void;
}

function SearchAndSort({
  onSearch,
  placeholder = 'Title',
}: SearchAndSortProps) {

  return (
    <StyleWrapper>
      <StyleSearch
        onSearch={onSearch}
        bgColor="darkSix"
        placeholder={placeholder}
      />


    </StyleWrapper>
  );
}

export default SearchAndSort;
