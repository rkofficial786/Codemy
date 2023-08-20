import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  const getRandeomColors = (numcolor) => {
    const colors = [];
    for (let i = 0; i < numcolor; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;

      colors.push(color);
    }
    return colors;
  };

  const courseNames = courses.map((course) => course.courseName);

  const chartDataForStudentsAndIncome = {
    labels: courseNames,
    datasets: [
      {
        label: "Students",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandeomColors(courseNames.length),
      },
      {
        label: "Price",
        data: courses.map((course) => course.price),
        backgroundColor: getRandeomColors(courseNames.length),
      },
    ],
  };

  const chartDataForIncome = {
    labels: courseNames,
    datasets: [
      
      {
        label: "Income",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandeomColors(courseNames.length),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full flex flex-wrap">
        {/* Render the Grouped Bar chart based on the selected chart */}
        <Bar
          data={
            currChart === "students"
              ? chartDataForStudentsAndIncome
              : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
