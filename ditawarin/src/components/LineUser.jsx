import { options } from "joi";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function LineUser({ name, data }) {
	let count = [];
	data.forEach((element, index) => {
		count.push(index + 1);
	});

	let dataList = {
		labels: count,
		datasets: [
			{
				label: name,
				data: data,
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
			x: {
				display: true,
				title: {
					display: true,
					text: "Jumlah",
					font : {
						size : 20,
					}
				},
			},
			y: {
				display: true,
				title: {
					display: true,
					text: "Harga",
					font : {
						size : 20,
					}
				},
			},
		},
	};


	return <>{<Line data={dataList} options={options}/>}</>;

}
