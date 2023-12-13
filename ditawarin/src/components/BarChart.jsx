import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const BarChart = ({ Data }) => {
	const values = Data.map((a) => {
		return a.transaction;
	});

	const dates = Data.map((a) => {
		const date = new Date(a.date);
		const formattedDate = date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		});
		return formattedDate;
	});

	const data = {
		labels: dates,
		datasets: [
			{
				label: "Purchase",
				data: values,
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	return (
		<div>
			<h2>Bar Chart</h2>
			<Bar data={data} />
		</div>
	);
};

export default BarChart;
