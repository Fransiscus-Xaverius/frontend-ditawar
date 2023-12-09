import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const BarChart = () => {
	const data = {
		labels: ['January',],
		datasets: [
			{
				label: 'Transactions',
				data: [12, 19, 3],
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
			x: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div>
			<h2>Bar Chart</h2>
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
