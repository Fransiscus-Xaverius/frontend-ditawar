import { useEffect, useState } from "react";
import DoughnutChart from "../components/DoughnutChart";
import client from "../client";
import HistoryChart from "../components/HistoryChart";
import { useLoaderData } from "react-router-dom";

function Report() {
	const [useraktif, setuseraktif] = useState(0);
	const [usernonaktif, setusernonaktif] = useState(0);
	const [trans, settrans] = useState(0);

	const AllUser = async () => {
		const result = (await client.get("/allUser")).data.result;
		setuseraktif(result.filter((user) => user.role == "verified").length);
		setusernonaktif(
			result.filter(
				(user) => user.role == "unverified" || user.role == "banned",
			).length,
		);
	};

	const AllTrans = async () => {
		const result = (await client.get("/allTransactions")).data;
		settrans(result.length);
	};

	useEffect(() => {
		AllUser();
		AllTrans();
	}, []);

	const payment = useLoaderData();

	return (
		<>
			<div style={{ width: "50%" }}>
				<DoughnutChart Trans={trans} UserA={useraktif} UserN={usernonaktif} />
			</div>
			<div style={{width : "90%"}}>
				<HistoryChart data={payment} />
			</div>
		</>
	);
}

export default Report;
