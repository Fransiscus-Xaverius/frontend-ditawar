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

	let Rupiah = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

	return (
		<>
			<div style={{ width: "50%" }}>
				<DoughnutChart Trans={trans} UserA={useraktif} UserN={usernonaktif} />
			</div>
			<div style={{width : "90%"}}>
				<HistoryChart data={payment} />
			</div>

			<table className="table">
				<thead className="table-success">
					<tr>
						<th className="text-center">Seller</th>
						<th className="text-center">Buyer</th>
						<th className="text-center">Auction</th>
						<th className="text-center">Price</th>
						<th className="text-center">Status</th>
					</tr>
				</thead>
				<tbody>
					{payment.map((pay) => {
						console.log(pay);
						return (
							<tr className="table-light">
								<td className="text-center">{pay.seller.nama}</td>
								<td className="text-center">{pay.buyer.nama}</td>
								<td className="text-center">{pay.item}</td>
								<td className="text-center">{Rupiah.format(parseInt(pay.transaction))}</td>
								<td className="text-center bg-success fw-bold">{pay.status}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Report;
