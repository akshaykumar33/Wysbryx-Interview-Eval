"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SkillRadarChartProps {
  groupScores: { title?: string; group?: string; score: number }[];
}

export function SkillRadarChart({ groupScores }: SkillRadarChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = groupScores.map((g) => {
    const name = g.title || g.group || "";
    let shortName = name;
    if (name.includes("Product")) shortName = "Product";
    else if (name.includes("System")) shortName = "Architecture";
    else if (name.includes("Security")) shortName = "Security & Scale";
    else if (name.includes("AI")) shortName = "AI & Debug";
    else if (name.includes("Human")) shortName = "Leadership";
    
    // Scale score properly 0 to 100
    const rawScore = g.score || 0;
    const scaledScore = rawScore <= 10 ? Math.round(rawScore * 10) : rawScore;

    return {
      subject: shortName,
      score: scaledScore, // 0 to 100
      fullMark: 100,
    };
  });

  const textFill = isDark ? "#E2E8F0" : "#1E293B";
  const gridStroke = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
  const tooltipBg = isDark ? "#0B0F17" : "#FFFFFF";
  const tooltipText = isDark ? "#F8FAFC" : "#0F172A";

  return (
    <div className="w-full h-[360px] p-2 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke={gridStroke} strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: textFill, fontSize: 11, fontWeight: 700 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={gridStroke} />
          <Radar
            name="Skill Score"
            dataKey="score"
            stroke="#E06828"
            strokeWidth={2.5}
            fill="#E06828"
            fillOpacity={0.5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: "rgba(224, 104, 40, 0.4)",
              borderRadius: "12px",
              color: tooltipText,
              fontSize: "12px",
              fontWeight: "600",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
