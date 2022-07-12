import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useUser = () => {
  const { data, error } = useSWR(`/api/upload`, fetcher);

  return {
    uploads: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
