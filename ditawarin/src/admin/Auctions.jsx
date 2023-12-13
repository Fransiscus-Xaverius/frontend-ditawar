import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import Eye from "../assets/eye.png";
import { Form, useLoaderData } from "react-router-dom";
import client from "../client";
import { useEffect, useState } from "react";
import LineChart from "../components/LineChart";

function Auctions() {
	const Auction = useLoaderData();
	const [Look, setLook] = useState(false);
	const [ListBid, setListBid] = useState([]);
	const [countBid, setcountBid] = useState(null);
	const [BidList, setBidList] = useState(null);

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
			await client.post(`/warningAuction?id_user=${params}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	async function LookAuction(params) {
		setLook(true);
		let result;
		try {
			result = await client.get(`/allBid?id_auction=${params}`);
			setListBid(result.data.result);
		} catch (error) {
			alert(error);
		}
	}

	useEffect(() => {
		const count = ListBid.map((bid,i) => {
			return i+1
		});
		setcountBid(count);
		const bid = ListBid.map((bid) => {
			return bid.bid
		});
		setBidList(bid);
	}, [ListBid])

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
								<td className="w-25">Rp {act.highest_bid.bid}</td>
								<td className="w-25">
									{!act.ended && <div className="bg-success">PROGRESS</div>}
									{act.ended && <div className="bg-success px-1">DONE</div>}
								</td>
								<td className="d-flex w-25">
									<button
										className="bg-primary mx-1"
										onClick={() => LookAuction(act._id)}
									>
										<img src={Eye} style={{ width: "35px" }} />
									</button>
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
			{Look && <LineChart countBid={countBid} BidList={BidList} />}
		</>
	);
}

export default Auctions;
