import React from "react";
import useUploads from "../utils/useUploads";
interface UploadTriggerProps {}
import { useSWRConfig } from "swr";
const UploadTrigger: React.FC<UploadTriggerProps> = ({}) => {
  const { mutate } = useSWRConfig();
  const { uploads, isLoading, isError } = useUploads();
  return (
    <>
      <button onClick={async () => mutate("/api/upload")}>Click me</button>
    </>
  );
};

export default UploadTrigger;
