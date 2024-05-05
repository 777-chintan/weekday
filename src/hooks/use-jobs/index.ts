import useMutation from "../use-mutation";
import { GET_JOB_CONFIG, JobsBody, JobsResponse } from "./useJobs.types";

const useJobs = () => {
  const { mutateAsync, loading, data, error } = useMutation<
    JobsResponse,
    JobsBody
  >(GET_JOB_CONFIG);

  return {
    loading,
    data,
    error,
    mutateAsync,
  };
};

export default useJobs;
