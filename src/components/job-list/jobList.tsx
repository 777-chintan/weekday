import { connect } from "react-redux";
import { RootState } from "../../store/store.types";
import { JobFiltertype, JobListProps } from "./jobList.types";
import useJobs from "../../hooks/use-jobs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { JobsActionTypes } from "../../store/reducers/jobs/jobs.types";
import { JobCard } from "../job-card";
import { Grid, TextField } from "@mui/material";
import { DropdownInput } from "../drop-down-input";
import { EXPERIENCE_OPTIONS, TECH_STACK, WORK_MODE } from "./jobList.constants";
import "./jobList.css";
import { JobCardSkeleton } from "./components/job-card-skeleton";
import useFilteredJobs from "../../hooks/use-filtered-jobs";

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver | null>(null);
  const endOfListRef = useRef<HTMLParagraphElement>(null);

  // Intersection Observer callback
  const handleIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        !loading && loadMorejobs();
      }
    });
  };

  const { data, mutateAsync, loading } = useJobs();
  const [filters, setFilters] = useState<JobFiltertype>({
    experience: "",
    location: "",
    workMode: "",
    companyName: "",
    techStack: [],
    role: "",
    minBasePay: "",
  });

  // Load more jobs only if loading is false & all jobs are not loaded
  const loadMorejobs = () => {
    (jobs.jobs.length < jobs.total || jobs.total === 0) &&
      mutateAsync({
        limit: 10,
        offset: jobs.jobs.length,
      });
  };

  // Load more jobs on initial render
  useEffect(() => {
    loadMorejobs();
  }, []);

  // Append new jobs to the list
  useEffect(() => {
    if (data) {
      dispatch({
        type: JobsActionTypes.APPEND,
        payload: {
          jobs: data.jdList,
          total: data.totalCount,
        },
      });
    }
  }, [data]);

  // Update filters on select change
  const onSelectChange = (fieldName: string) => (value: any) => {
    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  // Update filters on text field change
  const handleChangeTextField =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        [fieldName]: e.target.value,
      });
    };

  const filteredJobs = useFilteredJobs({ filters, jobs });

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection);
    if (endOfListRef.current) {
      observer.current.observe(endOfListRef.current);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={3} xl={2} className="filterContainer">
        <DropdownInput
          label="Experience"
          value={filters.experience}
          onChange={onSelectChange("experience")}
          options={EXPERIENCE_OPTIONS}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} xl={2} className="filterContainer">
        <DropdownInput
          label="Tech Stack"
          value={filters.techStack}
          multiple
          onChange={onSelectChange("techStack")}
          options={TECH_STACK}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} xl={2} className="filterContainer">
        <DropdownInput
          label="Work Mode"
          value={filters.workMode}
          onChange={onSelectChange("workMode")}
          options={WORK_MODE}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} xl={2}>
        <TextField
          sx={{ width: "100%" }}
          label="Company Name"
          value={filters.companyName || ""}
          onChange={handleChangeTextField("companyName")}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} xl={2}>
        <TextField
          sx={{ width: "100%" }}
          label="Location"
          value={filters.location || ""}
          onChange={handleChangeTextField("location")}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} xl={2}>
        <TextField
          sx={{ width: "100%" }}
          label="Role"
          value={filters.role || ""}
          onChange={handleChangeTextField("role")}
        />
      </Grid>

      <Grid item xs={12} md={4} lg={3} xl={2}>
        <TextField
          sx={{ width: "100%" }}
          label="Min BasePay"
          type="number"
          value={filters.minBasePay || ""}
          onChange={handleChangeTextField("minBasePay")}
        />
      </Grid>

      <Grid container item xs={12} spacing={6}>
        {filteredJobs.map((job, index) => (
          <JobCard key={job.jdUid + index} job={job} />
        ))}

        {loading ? (
          <React.Fragment>
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </React.Fragment>
        ) : null}
        <p ref={endOfListRef}></p>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  jobs: state.jobs,
});

export default connect(mapStateToProps)(JobList);
