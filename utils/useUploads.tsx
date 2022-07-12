import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());
import { ListItemProps } from "../components/ListItem";
interface returnData {
  uploads: ListItemProps[];
  isLoading: boolean;
  error: Error;
}

const useUploads = (): returnData => {
  const { data, error } = useSWR(`/api/upload`, fetcher);
  return {
    uploads: data,
    isLoading: !error && !data,
    error: error,
  };
};

export default useUploads;
