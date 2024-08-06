import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { EarningsSummaryChart } from "./chart";
import { PieChartWithPaddingAngle } from "./charts";
import Example from "./liveBookStatusTable";
import SharedHeader from "./sharedHead";

const DashboardContent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SharedHeader>Admin/Dashboard</SharedHeader>
      <Typography
        sx={{
          p: 2,
          color: "black",
          borderRadius: "20px",
          boxShadow: "2px 2px 2px 2px white",
          backgroundColor: "white",
          marginBottom: "10px",
          marginTop: "-15px",
          fontSize: "24px",
        }}
        gutterBottom
      >
        Admin/ Dashboard
      </Typography>
      <Grid container spacing={1}>
        <Grid
          sx={{
            p: 2,
            borderRadius: "20px",
            width: "200px",
            backgroundColor: "white",
            margin: "20px",
          }}
          item
          xs={3}
          md={3}
        >
          <Paper sx={{ p: 2, backgroundColor: "white" }}>
            <Typography
              sx={{
                p: 0,
                color: "#525256",
                fontSize: "24px",
                lineHeight: "1.5",
              }}
              variant="h6"
              gutterBottom
            >
              This Month Statistics
            </Typography>
            <Typography sx={{ marginTop: "-10px" }} variant="subtitle1">
              Tue, 14 Nov, 2024, 11.30 AM
            </Typography>
            <Box
              sx={{
                marginBottom: "-20px",
                padding: "30px 5px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "#525256" }} variant="h5">
                  Income
                </Typography>
                <Typography variant="inherit">This Month</Typography>
              </Box>
              <Divider sx={{ margin: "10px 0" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    display: "block",
                  }}
                  variant="h4"
                >
                  ETB 9460.00
                </Typography>
                <Typography sx={{ color: "#525256", display: "block" }}>
                  compared to 9940 last month
                </Typography>
                <Typography sx={{ color: "#525256", display: "block" }}>
                  Last Month Income ETB 25658.00
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ p: 2, backgroundColor: "white", marginTop: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  p: 0,
                  color: "#525256",
                  lineHeight: "1.5",
                }}
                gutterBottom
                variant="h6"
              >
                Available Books
              </Typography>
              <Typography variant="subtitle1">Today</Typography>
            </Box>

            <Box
              sx={{
                marginBottom: "-20px",
                padding: "30px 5px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <PieChartWithPaddingAngle />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <span>{"Group A"}</span> <span>54</span>
                </Typography>

                <Typography
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <span>{"Group A"}</span> <span>54</span>
                </Typography>
                <Typography
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <span>{"Group A"}</span> <span>54</span>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item sx={{ margin: "10px" }} xs={8} md={8}>
          <Paper sx={{ p: 2, width: "100%" }}>
            <Example />
          </Paper>
          <Paper>
            <EarningsSummaryChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
