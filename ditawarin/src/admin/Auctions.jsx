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
	const limitPage = Math.ceil(Auction.length / itemsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	let Rupiah = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

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
			<table className="table">
				<thead>
					<tr className="table-success">
						<th scope="col" className="text-center">PRODUCT</th>
						<th scope="col" className="text-center">PRICE</th>
						<th scope="col" className="text-center">STATUS</th>
						<th scope="col" className="text-center">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((act) => {
						let url =
							import.meta.env.VITE_API_URL + "/static/" + act.item.images;
						console.log(act.highest_bid);
						return (
							<tr>
								<td className="w-50 text-center">
									<div className="d-flex">
										<img src={`${url}`} style={{ width: "100px" }} />
										<div className="ms-5" style={{ alignSelf: "center" }}>
											{act.item.nama}
										</div>
									</div>
								</td>
								<td className="w-25 align-middle text-center">
									{act.highest_bid ? Rupiah.format(parseInt(act.highest_bid.bid)) : Rupiah.format(parseInt(act.asking_price))}
								</td>
								<td className="w-25 align-middle text-center">
									{!act.ended && <div className="bg-success">PROGRESS</div>}
									{act.ended && <div className="bg-success px-1">DONE</div>}
								</td>
								<td className="w-25 align-middle text-center">
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
			{console.log(limitPage)}
			<div style={{ display: "flex", justifyContent: "center" }}>
				<button
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					className="border-0 bg-transparent"
				>
					<img style={{ width: "40px", height: "40px" }} src={ArrowLeft} />
				</button>
				<span>
					{limitPage == 1 && (
						<>
							<button
								onClick={() => paginate(1)}
								disabled={currentPage === 1}
								className="border-0 fs-3 px-3 bg-transparent"
							>
								1
							</button>
						</>
					)}
					{limitPage == 2 && (
						<>
							<button
								onClick={() => paginate(1)}
								disabled={currentPage === 1}
								className="border-0 fs-3 px-3 bg-transparent"
							>
								1
							</button>
							<button
								onClick={() => paginate(2)}
								disabled={currentPage === 2}
								className="border-0 fs-3 px-3 bg-transparent"
							>
								2
							</button>
						</>
					)}
					{limitPage > 2 && (
						<>
							{currentPage === 1 && (
								<>
									<button
										onClick={() => paginate(currentPage)}
										disabled
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage}
									</button>
									<button
										onClick={() => paginate(currentPage + 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage + 1}
									</button>
									<button
										onClick={() => paginate(currentPage + 2)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage + 2}
									</button>
								</>
							)}
							{currentPage > 1 && currentPage < limitPage && (
								<>
									<button
										onClick={() => paginate(currentPage - 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{" "}
										{currentPage - 1}
									</button>
									<button
										onClick={() => paginate(currentPage)}
										disabled
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage}
									</button>
									<button
										onClick={() => paginate(currentPage + 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage + 1}
									</button>
								</>
							)}
							{currentPage > 1 && currentPage == limitPage && (
								<>
									<button
										onClick={() => paginate(currentPage - 2)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{" "}
										{currentPage - 2}
									</button>
									<button
										onClick={() => paginate(currentPage - 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage - 1}
									</button>
									<button
										onClick={() => paginate(currentPage)}
										disabled
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage}
									</button>
								</>
							)}
						</>
					)}
				</span>
				<button
					onClick={() => {
						paginate(currentPage + 1);
					}}
					className="border-0 bg-transparent"
					disabled={limitPage <= currentPage}
				>
					<img style={{ width: "40px", height: "40px" }} src={ArrowRight} />
				</button>
			</div>
			{Look && <LineChart countBid={countBid} BidList={BidList} />}
		</>
	);
}

export default Auctions;
