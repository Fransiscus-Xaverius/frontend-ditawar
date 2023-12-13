import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import Eye from "../assets/eye.png";
import BarChart from "../components/BarChart";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

function Payment() {
	const data = useLoaderData();
	const data2 = useLoaderData();

	const [Look, setLook] = useState(false);
	const [ListPurchase, setListPurchase] = useState(null);

	const sortPurchase = () => {
		data.sort((a, b) => {
			return b.transaction - a.transaction;
		});
	};
	const sortPurchaseTime = () => {
		data2.sort((a, b) => {
			return a.date - b.date;
		});
	};

	const Looking = async (params) => {
		setLook(true);
		setListPurchase(params);
	};

	useEffect(() => {
		sortPurchase();
		sortPurchaseTime();
	}, []);

	return (
		<>
			{!Look && (
				<>
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
										<td>
											<img src={url} style={{ width: "100px" }} />
										</td>
										<td>Rp. {a.transaction}</td>
										<td style={{ width: "100px" }}>
											<div className="bg-success rounded text-center p-1">
												DONE
											</div>
										</td>
										<td className="w-20">
											<button
												className="bg-secondary rounded border-0"
												onClick={() => Looking(a)}
											>
												<img src={Eye} style={{ width: "35px" }} />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<BarChart Data={data2} />
				</>
			)}
			{Look && (
				<div>
					<img
						src={import.meta.env.VITE_API_URL + "/static/" + ListPurchase.item}
						style={{ width: "300px" }}
					/>
					<h1>
						<b>Rp. {ListPurchase.transaction}</b>{" "}
					</h1>
					<h2>Seller {ListPurchase.seller.nama}</h2>
					<h2>Buyer {ListPurchase.buyer.nama}</h2>
					{console.log(ListPurchase)}

					<button onClick={() => setLook(false)} className="bg-primary rounded fs-5 text-black">BACK</button>
				</div>
			)}
		</>
	);
}

export default Payment;
