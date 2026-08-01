"use client";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ApexRadarProps {
  groupScores: { title: string; score: number }[];
}

export default function ApexRadarChart({ groupScores }: ApexRadarProps) {
  const radarCategories = groupScores.map((g) => g.title);
  const radarSeriesData = groupScores.map((g) => g.score);

  const radarOptions: ApexCharts.ApexOptions = {
    series: [{ name: "Competency Score", data: radarSeriesData }],
    chart: { height: 260, type: "radar", toolbar: { show: false } },
    colors: ["#E06828"],
    stroke: { width: 2 },
    fill: { opacity: 0.25 },
    markers: { size: 4, colors: ["#E06828"] },
    xaxis: {
      categories: radarCategories,
      labels: {
        style: {
          colors: ["#94A3B8", "#94A3B8", "#94A3B8", "#94A3B8", "#94A3B8"],
          fontSize: "11px",
          fontFamily: "JetBrains Mono",
        },
      },
    },
    yaxis: { max: 10, min: 0, show: false },
  };

  return (
    <div className="w-full flex items-center justify-center">
      <ReactApexChart options={radarOptions} series={radarOptions.series} type="radar" height={260} width="100%" />
    </div>
  );
}
