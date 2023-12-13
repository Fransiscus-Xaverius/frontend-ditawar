import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import Eye from "../assets/eye.png";
import BarChart from "../components/BarChart";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

function Payment() {
	const data = useLoaderData();

	const sortPurchase = () => {
		data.sort((a, b) => {
			return b.transaction - a.transaction;
		});
	}

	useEffect(() => {
		sortPurchase();
	}, []);
	
	return (
		<>
		{console.log(data)}
			<table className="table">
				<thead>
					<tr className="table-success">
						<th>PRODUCT</th>
						<th>PRICE</th>
						<th>STATUS</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
					{data.map((a) => {
						let url = import.meta.env.VITE_API_URL + "/static/" + a.item;
						return (
							<tr>
								<td><img src={url} style={{width : "100px"}}/></td>
								<td>Rp. {a.transaction}</td>
								<td style={{ width: "100px" }}>
									<div className="bg-success rounded text-center p-1">DONE</div>
								</td>
								<td className="w-20">
									<button className="bg-secondary rounded border-0">
										<img src={Eye} style={{ width: "35px" }} />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<BarChart />
		</>
	);
}

export default Payment;
