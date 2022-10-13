import { useState } from 'react';

import PATHS from 'utils/paths';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import MovieList from 'components/Organisms/MovieList';
import SearchAndSort from 'components/Molecules/SearchAndSort/SearchAndSort';
import {MovieItemProps} from '../../../interfaces/movie.interface.props';

const HomeTemplate = () => {
  const { toggleModal, isOpen } = useModal();
  const [search, setSearch] = useState<string | undefined>("");

  const { data, loading, getData } = useQueryFetch<MovieItemProps[]>({
    path: PATHS.POPULAR,
  });


  const onSearch = (search?: string) => {
    setSearch(search);
    getData({
      filter: [
        {
          key: 'search',
          value: search || "",
        }
      ],
    }).then();
  };

  const toggle = () => {
    toggleModal();
  };

  return (
    <>
      <HeadPage
        onAdd={toggle}
        onRefresh={getData}
        title="List of Movies"
        description="Save your favorites movies"
      />

      <SearchAndSort onSearch={onSearch}  />

      {!loading ? (
        <MovieList
          refetchData={getData}
          items={data.results ?? []}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomeTemplate;
