import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { EarningsSummaryChart } from "./chart";
import { PieChartWithPaddingAngle } from "./charts";
import SharedHeader from "./sharedHead";
import CircleIcon from "@mui/icons-material/Circle";

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: "20px",
            backgroundColor: "white",
            margin: "10px",
            width: "25%",
            minWidth: "300px",
          }}
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
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <CircleIcon
                      fontSize="large"
                      sx={{
                        color: "green",
                      }}
                    />
                    <span>{"Group A"}</span>
                    <span style={{ justifySelf: "end" }}>54</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ margin: "10px", width: "70%" }}>
          <Paper sx={{ p: 2, width: "100%" }}>{children}</Paper>
          <Paper>
            <EarningsSummaryChart />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardContent;
