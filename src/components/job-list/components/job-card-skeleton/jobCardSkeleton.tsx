import { Card, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "./jobCardSkeleton.css";

export default function JobCardSkeleton() {
  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card className="jobCard">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton className="chipSkeleton" variant="rectangular" />
          </Grid>
          <Grid item xs={12} container spacing={4}>
            <Grid item xs={3}>
              <Skeleton
                className="logoSkeleton"
                variant="rounded"
                height={60}
              />
            </Grid>
            <Grid item xs={9}>
              <Skeleton className="chipSkeleton" variant="text" />
              <Skeleton className="chipSkeleton" variant="text" />
              <Skeleton className="chipSkeleton" variant="text" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Skeleton className="chipSkeleton" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rounded" height={200} width={"100%"} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              className="buttonSkeleton"
              variant="rounded"
              height={40}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
