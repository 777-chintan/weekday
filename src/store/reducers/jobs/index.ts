import { jobInitialState } from "./jobs.constats";
import { JobsState, JobsAction, JobsActionTypes } from "./jobs.types";

const exampleReducer = (
  state = jobInitialState,
  action: JobsAction
): JobsState => {
  switch (action.type) {
    case JobsActionTypes.APPEND:
      return {
        jobs: [...state.jobs, ...action.payload.jobs],
        total: action.payload.total,
      };
    case JobsActionTypes.RESET:
      return jobInitialState;
    default:
      return jobInitialState;
  }
};

export default exampleReducer;
