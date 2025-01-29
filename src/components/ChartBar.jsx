

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample chart data
const chartData = [
  { date: "2024-04-01", desktop: 252, mobile: 90, webAndMobileApp: 120, flutter: 85, blockchain: 55, iot: 70, cybersecurity: 30 },
  { date: "2024-04-01", desktop: 222, mobile: 150, webAndMobileApp: 180, flutter: 95, blockchain: 70, iot: 85, cybersecurity: 35 },
  { date: "2024-04-01", desktop: 762, mobile: 150, webAndMobileApp: 330, flutter: 130, blockchain: 110, iot: 120, cybersecurity: 50 },
  // More data entries here...
  { date: "2024-06-30", desktop: 146, mobile: 400, webAndMobileApp: 400, flutter: 160, blockchain: 95, iot: 130, cybersecurity: 75 },
  { date: "2024-06-30", desktop: 346, mobile: 400, webAndMobileApp: 410, flutter: 150, blockchain: 90, iot: 120, cybersecurity: 65 },
  { date: "2024-06-30", desktop: 546, mobile: 400, webAndMobileApp: 500, flutter: 180, blockchain: 120, iot: 150, cybersecurity: 85 },
];


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--color-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--color-2))",
  },
  PC: {
    label: "Mobile",
    color: "hsl(var(--color-2))",
  },
};

// Helper function to filter data based on selected time range
const filterDataByDateRange = (data, timeRange, referenceDate) => {
  let daysToSubtract = 90;
  if (timeRange === "30d") daysToSubtract = 30;
  else if (timeRange === "7d") daysToSubtract = 7;

  const startDate = new Date(referenceDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);

  return data.filter(item => new Date(item.date) >= startDate);
};

function ChartBar() {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Filter chart data based on selected time range
  const filteredData = filterDataByDateRange(chartData, timeRange, "2024-06-30");

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the selected time range</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange} className="bg-gray-400">
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl ">
            <SelectItem value="360d" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {/* Desktop gradient */}
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              {/* Mobile gradient */}
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            
             
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="PC"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
           
           
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export default ChartBar