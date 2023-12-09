import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import { Form, useLoaderData } from "react-router-dom";
import client from "../client";

function Auctions() {
	const Auction = useLoaderData();
	console.log(Auction);

	async function StopAuction(params) {
		try {
			await client.put(`/stopAuction?id=${params}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	async function WarningAuction(params) {
		try {
			await client.post(`/warningAuction?id_user=${params}`)
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	return (
		<>
			<p className="fw-bold">AUCTION</p>
			<table
				className="table"
				style={{
					overflowY: "scroll",
					overflowX: "hidden",
					height: "55vh",
					display: "block",
				}}
			>
				<thead>
					<tr className="table-success">
						<th scope="col">PRODUCT</th>
						<th scope="col">PRICE</th>
						<th scope="col">STATUS</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{Auction.map((act) => {
						let url =
							import.meta.env.VITE_API_URL + "/static/" + act.item.images;
						return (
							<tr>
								<td className="w-50">
									<img src={`${url}`} style={{ width: "100px" }} />
									{act.item.nama}
								</td>
								<td className="w-25">Rp {act.asking_price}</td>
								<td className="w-25">
									{!act.ended && <div className="bg-success">PROGRESS</div>}
									{act.ended && <div className="bg-success px-1">DONE</div>}
								</td>
								<td className="d-flex w-25">
									<button
										className="bg-warning mx-1"
										onClick={() => WarningAuction(act.id_user)}
									>
										WARNING
									</button>
									<button
										className="bg-danger mx-1"
										onClick={() => StopAuction(act._id)}
									>
										STOP
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Auctions;
