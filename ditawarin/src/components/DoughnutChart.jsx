import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({Trans, UserA, UserN}) {
	const data = {
		labels: ["Transaction", "User Active", "User Nonactive"],
		datasets: [
			{
				data: [Trans,UserA,UserN],
				backgroundColor: [
					"rgba(0, 0, 255, 0.5)",
					"rgba(0, 255, 0, 0.5)",
					"rgba(255, 0, 0, 0.5)",
				],
				hoverBackgroundColor: [
					"rgba(0, 0, 255, 1)",
					"rgba(0, 255, 0, 1)",
					"rgba(255, 0, 0, 1)",
				],
			},
		],
	};

	return <Doughnut data={data} />;
}

export default DoughnutChart;
