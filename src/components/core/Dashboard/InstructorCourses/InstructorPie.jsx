import { useState } from "react";
import { Pie } from "react-chartjs-2";



export default function InstructorPie({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.topStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.topAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom", // Adjust legend position
      },
    },
  };

  return (
    <div className="flex flex-col bg-richblack-800 rounded-md p-6">
      <p className="text-lg font-bold text-richblack-5 mb-4">Top performing</p>
      <div className="flex gap-x-4">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm py-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm py-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-[300px] w-full">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
