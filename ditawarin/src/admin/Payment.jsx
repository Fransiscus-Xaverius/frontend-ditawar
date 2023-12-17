import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import Eye from "../assets/eye.png";
import BarChart from "../components/BarChart";
import ArrowLeft from "../assets/arrowLeft.png";
import ArrowRight from "../assets/arrowRight.png";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Payment() {
	const data = useLoaderData();
	const data2 = useLoaderData();
	const [Look, setLook] = useState(false);
	const [ListPurchase, setListPurchase] = useState(null);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const filteredData = data.filter((item) =>
		item.item.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const Looking = async (params) => {
		setLook(true);
		setListPurchase(params);
	};

	// Pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
	const limitPage = data.length / itemsPerPage;
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	let Rupiah = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});
	return (
		<>
			{!Look && (
				<>
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
								<th>PRODUCT</th>
								<th>PRICE</th>
								<th>STATUS</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody>
							{currentItems.map((a) => {
								let url = import.meta.env.VITE_API_URL + "/static/" + a.image;
								return (
									<tr>
										<td>
											<img src={url} style={{ width: "100px" }} />
											<p>{a.item}</p>
										</td>
										<td>{Rupiah.format(parseInt(a.transaction))}</td>
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
					<BarChart Data={data2} />
				</>
			)}
			{Look && (
				<div>
					<img
						src={import.meta.env.VITE_API_URL + "/static/" + ListPurchase.image}
						style={{ width: "300px" }}
					/>
					<h1>
						<b>Rp. {ListPurchase.transaction}</b>{" "}
					</h1>
					<h2>Seller {ListPurchase.seller.nama}</h2>
					<h2>Buyer {ListPurchase.buyer.nama}</h2>
					{console.log(ListPurchase)}

					<button
						onClick={() => setLook(false)}
						className="bg-primary rounded fs-5 text-black"
					>
						BACK
					</button>
				</div>
			)}
		</>
	);
}

// {!Look && (
// 	<>
// 		<table className="table">
// 			<thead>
// 				<tr className="table-success">
// 					<th>PRODUCT</th>
// 					<th>PRICE</th>
// 					<th>STATUS</th>
// 					<th>ACTION</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{data.map((a) => {
// 					let url = import.meta.env.VITE_API_URL + "/static/" + a.image;
// 					return (
// 						<tr>
// 							<td>
// 								<img src={url} style={{ width: "100px" }} />
// 								<p>{a.item}</p>
// 							</td>
// 							<td>Rp. {a.transaction}</td>
// 							<td style={{ width: "100px" }}>
// 								<div className="bg-success rounded text-center p-1">
// 									DONE
// 								</div>
// 							</td>
// 							<td className="w-20">
// 								<button
// 									className="bg-secondary rounded border-0"
// 									onClick={() => Looking(a)}
// 								>
// 									<img src={Eye} style={{ width: "35px" }} />
// 								</button>
// 							</td>
// 						</tr>
// 					);
// 				})}
// 			</tbody>
// 		</table>
// 		<BarChart Data={data2} />
// 	</>
// )}
// {Look && (
// 	<div>
// 		<img
// 			src={import.meta.env.VITE_API_URL + "/static/" + ListPurchase.item}
// 			style={{ width: "300px" }}
// 		/>
// 		<h1>
// 			<b>Rp. {ListPurchase.transaction}</b>{" "}
// 		</h1>
// 		<h2>Seller {ListPurchase.seller.nama}</h2>
// 		<h2>Buyer {ListPurchase.buyer.nama}</h2>
// 		{console.log(ListPurchase)}

// 		<button
// 			onClick={() => setLook(false)}
// 			className="bg-primary rounded fs-5 text-black"
// 		>
// 			BACK
// 		</button>
// 	</div>
// )}
// </>

// 	);
// }

export default Payment;
