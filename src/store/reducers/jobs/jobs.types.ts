export interface Job {
  jdUid: string;
  jdLink?: string;
  workMode?: string;
  jobDetailsFromCompany?: string;
  maxJdSalary?: number;
  minJdSalary?: number | null;
  salaryCurrencyCode?: string;
  location?: string;
  minExp?: number;
  maxExp?: number;
  jobRole?: string;
  companyName?: string;
  logoUrl?: string;
  techStack?: string[];
}

export interface JobsState {
  total: number;
  jobs: Job[];
}

export enum JobsActionTypes {
  APPEND = "APPEND",
  RESET = "RESET",
}

interface AddJobsAction {
  type: typeof JobsActionTypes.APPEND;
  payload: { jobs: Job[]; total: number };
}

interface ResetJobsAction {
  type: typeof JobsActionTypes.RESET;
}

export type JobsAction = AddJobsAction | ResetJobsAction;
