import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import Eye from "../assets/eye.png";
import { Form, useLoaderData } from "react-router-dom";
import client from "../client";
import { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import ArrowLeft from "../assets/arrowLeft.png";
import ArrowRight from "../assets/arrowRight.png";

function Auctions() {
	const Auction = useLoaderData();
	const [Look, setLook] = useState(false);
	const [ListBid, setListBid] = useState([]);
	const [countBid, setcountBid] = useState(null);
	const [BidList, setBidList] = useState(null);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

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
		const count = ListBid.map((bid, i) => {
			return i + 1;
		});
		setcountBid(count);
		const bid = ListBid.map((bid) => {
			return bid.bid;
		});
		setBidList(bid);
	}, [ListBid]);

	const filteredData = Auction.filter((act) =>
		act.item.nama.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			{console.log(Auction)}
			<p className="fw-bold">AUCTION</p>
			<input
				type="text"
				value={search}
				onChange={handleSearch}
				placeholder="Search..."
				className="form-control my-3"
			/>
			<table
				className="table"
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
					{currentItems.map((act) => {
						let url =
							import.meta.env.VITE_API_URL + "/static/" + act.item.images;
						console.log(act.highest_bid);
						return (
							<tr>
								<td className="w-50">
									<div className="d-flex">
										<img src={`${url}`} style={{ width: "100px" }} />
										<div className="ms-5" style={{ alignSelf: "center" }}>
											{act.item.nama}
										</div>
									</div>
								</td>
								<td className="w-25 align-middle">
									Rp {act.highest_bid ? act.highest_bid.bid : act.asking_price}
								</td>
								<td className="w-25 align-middle">
									{!act.ended && <div className="bg-success">PROGRESS</div>}
									{act.ended && <div className="bg-success px-1">DONE</div>}
								</td>
								<td className="w-25 align-middle">
									<div className="d-flex">
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
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<button
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					className="border-0 bg-transparent"
				>
					<img style={{ width: "40px", height: "40px" }} src={ArrowLeft} />
				</button>
				{currentPage > 1 && (
					<span style={{ margin: "0 10px", fontSize: "25px" }}>
						{currentPage - 1}
					</span>
				)}
				<span
					style={{ margin: "0 10px", fontSize: "25px" }}
					className="fw-bold"
				>
					{currentPage}
				</span>
				<span style={{ margin: "0 10px", fontSize: "25px" }}>
					{currentPage + 1}
				</span>
				{currentPage == 1 && (
					<span style={{ margin: "0 10px", fontSize: "25px" }}>
						{currentPage + 2}
					</span>
				)}

				<button
					onClick={() => paginate(currentPage + 1)}
					className="border-0 bg-transparent"
				>
					<img style={{ width: "40px", height: "40px" }} src={ArrowRight} />
				</button>
			</div>
			{Look && <LineChart countBid={countBid} BidList={BidList} />}
		</>
	);
}

export default Auctions;
