import { Job } from "../../store/reducers/jobs/jobs.types";
import { GET_ALL_JOBS } from "../../constants";
import { NETWORK_CONFIG, POST } from "../../utils";

export type JobsBody = {
  limit: number;
  offset: number;
};

export const GET_JOB_CONFIG: NETWORK_CONFIG = {
  url: GET_ALL_JOBS,
  options: {
    method: POST,
  },
};

export type JobsResponse = {
  jdList: Job[];
  totalCount: number;
};
