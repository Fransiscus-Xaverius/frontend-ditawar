import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ BidList, countBid }) {
	let databid = {
		labels: countBid,
		datasets: [
			{
				label: "Bidder",
				data: BidList,
				fill: false,
				lineTension: 0.2,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 5,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
			},
		],
	};

	let options = {
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Harga",
					font: {
						size: 20,
					},
				},
			},
			x : {
				beginAtZero: true,
				title: {
					display: true,
					text: "Jumlah Bid",
					font: {
						size: 20,
					},
				},
			}
		},
	};

	return <>{<Line data={databid} options={options} />}</>;
}

export default LineChart;
