import { prisma } from "@/db";
import { verify } from "@/lib/utils";
import CircleIcon from "@mui/icons-material/Circle";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { cookies } from "next/headers";
import { EarningsSummaryChart } from "./chart";
import { PieChartWithPaddingAngle } from "./charts";
import { $Enums, User } from "@prisma/client";
import { EarningsSummaryChartProps } from "@/types";

interface DashboardProps extends React.PropsWithChildren {
  income: {
    name: "This Month" | "Last Month";
    income: number;
  }[];
  earningsSummaryChartProps: EarningsSummaryChartProps;
}

const DashboardContent = async ({
  children,
  income,
  earningsSummaryChartProps,
}: DashboardProps) => {
  const token = cookies().get("token")!;
  const decoded = await verify<User>(token.value)!;
  const user = await prisma.user.findFirst({
    where: {
      email: decoded.email,
    },
    include: {
      Book: {
        select: {
          category: true,
        },
      },
    },
  });

  const numberOfBooksByCategory = user?.Book.reduce((acc, book) => {
    const category = book.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<$Enums.Category, number>);

  const data = Object.entries(numberOfBooksByCategory ?? {}).map(
    ([label, value]) => ({
      label,
      value,
      color:
        label === "fiction"
          ? "#006AFF"
          : label === "business"
          ? "green"
          : "red",
    })
  );

  const lastMonthIncome = income.find(
    (item) => item.name === "Last Month"
  )?.income;
  const thisMonthIncome = income.find(
    (item) => item.name === "This Month"
  )?.income;

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
              {new Date().toLocaleString()}
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
                  ETB {thisMonthIncome}
                </Typography>
                <Typography sx={{ color: "#525256", display: "block" }}>
                  compared to {lastMonthIncome} last month
                </Typography>
                <Typography sx={{ color: "#525256", display: "block" }}>
                  Last Month Income ETB {lastMonthIncome}
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
                <PieChartWithPaddingAngle
                  booksCategory={numberOfBooksByCategory}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {data?.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
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
                          color: item.color,
                        }}
                      />
                      <span>{item.label}</span>
                    </Typography>
                    <Typography>
                      <span style={{ justifySelf: "end" }}>{item.value}</span>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ margin: "10px", width: "71%" }}>
          <Paper sx={{ p: 2, width: "100%" }}>{children}</Paper>
          <Paper>
            <EarningsSummaryChart {...earningsSummaryChartProps} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardContent;
