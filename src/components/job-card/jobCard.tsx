import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Chip, Collapse, Grid } from "@mui/material";
import { JobCardProps } from "./jobCard.types";
import "./jobCard.css";
import { capitalizeFirstLetter } from "../../utils";
import { useState } from "react";

export default function JobCard({ job }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card className="jobCard">
        <Chip label="Posted 10 days ago" variant="outlined" size="small" />
        <Grid container className="headerContainer" spacing={4}>
          {job?.logoUrl ? (
            <Grid item xs={3}>
              <CardMedia className="logo" component="img" image={job.logoUrl} />
            </Grid>
          ) : null}
          <Grid item xs={9} container>
            {job?.companyName ? (
              <Grid item xs={12}>
                <Typography variant="body2" className="companyName">
                  {capitalizeFirstLetter(job.companyName)}
                </Typography>
              </Grid>
            ) : null}
            {job?.jobRole ? (
              <Grid item xs={12}>
                <Typography variant="body2">
                  {capitalizeFirstLetter(job.jobRole)}
                </Typography>
              </Grid>
            ) : null}
            {job?.location ? (
              <Grid item xs={12}>
                <Typography variant="caption">
                  {capitalizeFirstLetter(job.location)}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        {job.minJdSalary || job.maxJdSalary ? (
          <Typography variant="body2">
            Estimated Salary: {job.minJdSalary}{" "}
            {job.minJdSalary && job.maxJdSalary ? "-" : ""} {job.maxJdSalary} (
            {job.salaryCurrencyCode})
          </Typography>
        ) : null}

        {job.jobDetailsFromCompany ? (
          <div className="aboutCompanyContainer">
            <div className={expanded ? "" : "aboutCompanyDescription"}>
              <Typography variant="h6">About Company:</Typography>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2">
                  {job.jobDetailsFromCompany}
                </Typography>
              </Collapse>
              {!expanded ? (
                <Typography variant="body2" className="companyDescription">
                  {job.jobDetailsFromCompany}
                </Typography>
              ) : null}
            </div>
            <Box
              className={expanded ? "viewJobButtonExpanded" : "viewJobButton"}
            >
              <Button
                variant="text"
                sx={{
                  color: "#4943da",
                }}
                onClick={handleExpandClick}
              >
                {expanded ? "Collapse Details" : "View Job"}
              </Button>
            </Box>
          </div>
        ) : null}

        {job?.minExp || job?.maxExp ? (
          <Box className="experienceContainer">
            <Typography className="experienceLabel">
              Minimum Experience
            </Typography>
            <Typography>
              {job.minExp} {job.maxExp && job.maxExp ? "-" : ""} {job.maxExp}{" "}
              years
            </Typography>
          </Box>
        ) : null}

        <Box className="applyButtonContainer">
          <Button variant="contained" className="applyButton">
            Easy Apply
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
