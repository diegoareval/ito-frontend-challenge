import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {fetchInstanceMovieDb} from 'services/fetchInstance';
import {MovieItemProps} from '../interfaces/movie.interface.props';

type FilterType = { key: string; value: string }[];

interface UserGetFetchProps {
  path: string;
  skip?: boolean;
  filters?: FilterType;
}

type movieResponse = {
  page: number, results: Array<MovieItemProps>, total_pages?: number, total_results?: number
}

export default function useQueryFetch<T>({
  path,
  skip,
  filters: filtersProp,
}: UserGetFetchProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<movieResponse>({page: 0, results: [] });
  const [detail, setDetail] = useState<MovieItemProps>({id: "", title: "", backdrop_path: "", overview: "", release_date: "", vote_average: "" });
  const [errors, setErrors] = useState<string | null>(null);

  const getData = useCallback(
    async (opts?: { filter?: FilterType; options?: AxiosRequestConfig }) => {
      setLoading(true);
      try {
       const filter = opts && opts.filter? opts.filter[0] : {key: "", value: "" }

        const { data } = await fetchInstanceMovieDb.get<T>(
          `${path}?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}`,
        );
        const info = data as movieResponse
       if(filter && filter.value){
         const filterInfo =  info.results.filter(result => result.title.includes(filter.value))
         setData({
           ...info,
           results: filterInfo
         });
       } else if(info.results){
           setData(info);
         } else {
         const detail = info as any
         setDetail(detail as MovieItemProps)
       }

      } catch (error: any) {
        setErrors(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          error?.message ?? error?.response?.data?.message ?? 'Error in request'
        );
      }
      setLoading(false);
    },
    [path, filtersProp]
  );

  useEffect(() => {
    if (!skip) {
      getData().then();
    }
  }, [getData, skip]);

  return {
    loading,
    data,
    errors,
    getData, detail
  };
}
