import { JobsState } from "../../store/reducers/jobs/jobs.types";

export interface JobListProps {
  jobs: JobsState;
}

export type JobFiltertype = {
  experience: string;
  companyName: string;
  location: string;
  workMode: string;
  techStack: string[];
  role: string;
  minBasePay: string;
};
