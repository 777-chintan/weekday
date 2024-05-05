import { useMemo } from "react";
import { JobFiltertype } from "../../components/job-list/jobList.types";
import { JobsState } from "../../store/reducers/jobs/jobs.types";

const useFilteredJobs = ({
  filters,
  jobs,
}: {
  filters: JobFiltertype;
  jobs: JobsState;
}) => {
  const filteredJobs = useMemo(() => {
    let localJobs = jobs.jobs;
    if (filters?.experience) {
      let experience = parseInt(filters.experience);
      localJobs = localJobs.filter(
        (job) =>
          (job?.minExp ? (job.minExp <= experience ? true : false) : true) &&
          (job?.maxExp ? (job.maxExp >= experience ? true : false) : true)
      );
    }

    if (filters?.companyName) {
      localJobs = localJobs.filter((job) =>
        job?.companyName
          ? job.companyName
              .toLowerCase()
              .includes((filters.companyName || "").toLowerCase())
          : false
      );
    }
    if (filters?.location) {
      localJobs = localJobs.filter((job) =>
        job?.location
          ? job.location
              .toLowerCase()
              .includes((filters.location || "").toLowerCase())
          : false
      );
    }
    if (filters?.workMode) {
      localJobs = localJobs.filter((job) =>
        job?.workMode
          ? job.workMode
              .toLowerCase()
              .includes((filters.workMode || "").toLowerCase())
          : false
      );
    }

    if (filters?.techStack.length > 0) {
      localJobs = localJobs.filter((job) => {
        let techStack = job?.techStack || [];
        let found = filters.techStack.every((tech) => techStack.includes(tech));
        return found;
      });
    }

    if (filters?.minBasePay) {
      localJobs = localJobs.filter((job) =>
        job?.minJdSalary
          ? job.minJdSalary >= parseInt(filters.minBasePay)
          : false
      );
    }

    if (filters?.role) {
      localJobs = localJobs.filter((job) =>
        job?.jobRole
          ? job.jobRole
              .toLowerCase()
              .includes((filters.role || "").toLowerCase())
          : false
      );
    }

    return [...localJobs];
  }, [jobs.jobs, filters]);

  return filteredJobs;
};

export default useFilteredJobs;
