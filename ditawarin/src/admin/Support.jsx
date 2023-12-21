import Accept from "../assets/accepted.png";
import Help from "../assets/help.png";
import Notification from "../assets/notification.png";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../client";
import ArrowLeft from "../assets/arrowLeft.png";
import ArrowRight from "../assets/arrowRight.png";

function Support() {
	const [showModal, setShowModal] = useState(false);
	const [textareaValue, setTextareaValue] = useState("");
	const support = useLoaderData();
	const [Feedback, setFeedback] = useState(support.rating);
	const [Service, setService] = useState(support.laporan);
	const [Load, setLoad] = useState(false);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [search2, setSearch2] = useState("");
	const [currentPage2, setCurrentPage2] = useState(1);
	const [itemsPerPage2, setItemsPerPage2] = useState(10);
	const [seller, setSeller] = useState(null);

	function handleFeedback() {}
	function handleService() {
		support.laporan.data.map(async (item) => {
			const result = await client.get(`/user?id=${item.id_user}`);
			const result2 = await client.get(`/auction?id=${item.id_auction}`);
			const result3 = await client.get(
				`/item?id=${result2.data.result.id_barang}`,
			);
			setService([
				...Service,
				{
					user: result.data.result.nama,
					email: result.data.result.email,
					item: result3.data.result.nama,
					img: result3.data.result.images,
					message: item.msg,
				},
			]);
		});
	}

	function handleSeller(email) {
		setShowModal(true);
		setSeller(email);
	}

	useEffect(() => {
		setTimeout(() => {
			setLoad(true);
		}, 1000);
	}, []);

	const filteredData = Feedback.filter(
		(fb) =>
			fb.seller.nama.toLowerCase().includes(search.toLowerCase()) ||
			fb.buyer.nama.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const filteredData2 = Service.filter((sv) =>
		sv.user.nama.toLowerCase().includes(search2.toLowerCase()),
	);

	const handleSearch2 = (event) => {
		event.preventDefault();
		setSearch2(event.target.value);
	};

	async function sendEmail(email, msg) {
		await client.post("/sendmail?email=" + email, {
			msg: msg,
			subject: "Customer Service",
		});
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
	const limitPage = Math.ceil(Feedback.length / itemsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const indexOfLastItem2 = currentPage2 * itemsPerPage2;
	const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
	const currentItems2 = filteredData2.slice(
		indexOfFirstItem2,
		indexOfLastItem2,
	);
	const limitPage2 = Math.ceil(Service.length / itemsPerPage2);
	const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

	const handleTextareaChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const handlePopup = () => {
		setShowModal(false);
		sendEmail(seller, textareaValue);
	};

	return (
		<>
			{console.log(Feedback)}
			<p className="fw-bold">USERS FEEDBACK</p>
			<input
				type="text"
				value={search}
				onChange={handleSearch}
				placeholder="Search..."
				className="form-control my-3"
			/>

			{!Load && <h4>Loading...</h4>}
			{Load && (
				<table className="table">
					<thead>
						<tr className="table-success">
							<th scope="col" className="text-center">
								SELLER
							</th>
							<th scope="col" className="text-center">
								BUYER
							</th>
							<th scope="col" className="text-center">
								MESSAGE
							</th>
							<th scope="col" className="text-center">
								RATING
							</th>
						</tr>
					</thead>
					<tbody>
						{console.log(currentItems)}
						{currentItems.map((item) => {
							return (
								<tr>
									<td className="text-center">{item.seller.nama}</td>
									<td className="text-center">{item.buyer.nama}</td>

									<td className="text-center">{item.comment}</td>
									<td className="text-center">
										{[...Array(parseInt(item.rating))].map((item) => {
											return <span>⭐</span>;
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}

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
			{console.log(Service)}
			<p className="fw-bold">CUSTOMER SERVICE</p>
			<input
				type="text"
				value={search2}
				onChange={handleSearch2}
				placeholder="Search..."
				className="form-control my-3"
			/>
			{!Load && <h4>Loading...</h4>}
			{Load && !showModal && (
				<table className="table">
					<thead>
						<tr className="table-success">
							<th scope="col" className="text-center">
								CUSTOMER
							</th>
							<th scope="col" className="text-center">
								SELLER
							</th>
							<th scope="col" className="text-center">
								PROBLEM
							</th>
							<th scope="col" className="text-center">
								ACTION
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems2.map((item) => {
							return (
								<tr>
									<td className="text-center">{item.user.nama}</td>
									<td className="text-center">{item.seller.nama}</td>

									<td className="text-center">{item.reason}</td>
									<td className="text-center">
										<button
											onClick={() =>
												sendEmail(
													item.user.email,
													"Terima kasih telah menghubungi kami, Kami akan segera memproses laporan anda. Dan bila ada yang kuran jelas silahkan hubungi kami kembali di email ini.",
												)
											}
											className="bg-transparent border-0"
										>
											<img src={Help} style={{ width: "40px" }} />
										</button>
										<button
											onClick={() =>
												sendEmail(
													item.user.email,
													"Semua laporan anda telah kami proses, terima kasih telah menggunkan jasa layanan kami. Bila ada yang kurang jelas silahkan hubungi kami kembali di email ini.",
												)
											}
											className="bg-transparent border-0"
										>
											<img src={Accept} style={{ width: "45px" }} />
										</button>
										<button
											onClick={() => handleSeller(item.seller.email)}
											className="bg-transparent border-0"
										>
											<img src={Notification} style={{ width: "45px" }} />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			{showModal && (
				<div>
					<form className="text-center" onSubmit={handlePopup}>
						<textarea
							cols="160"
							rows="10"
							placeholder="NOTIFIKASI"
							onChange={handleTextareaChange}
						></textarea>
						<button type="submit">KIRIM</button>
					</form>
				</div>
			)}

			<div style={{ display: "flex", justifyContent: "center" }}>
				<button
					onClick={() => paginate2(currentPage2 - 1)}
					disabled={currentPage2 === 1}
					className="border-0 bg-transparent"
				>
					<img style={{ width: "40px", height: "40px" }} src={ArrowLeft} />
				</button>
				<span>
					{limitPage2 == 1 && (
						<>
							<button
								onClick={() => paginate2(1)}
								disabled={currentPage2 === 1}
								className="border-0 fs-3 px-3 bg-transparent"
							>
								1
							</button>
						</>
					)}
					{limitPage2 == 2 && (
						<>
							<button
								onClick={() => paginate2(1)}
								disabled={currentPage2 === 1}
								className="border-0 fs-3 px-3 bg-transparent"
							>
								1
							</button>
							<button
								onClick={() => paginate2(2)}
								disabled={currentPage2 === 2}
								className="border-0 fs-3 px-3 bg-transparent"
							>
								2
							</button>
						</>
					)}
					{limitPage2 >= 2 && (
						<>
							{currentPage2 === 1 && (
								<>
									<button
										onClick={() => paginate2(currentPage2)}
										disabled
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2}
									</button>
									<button
										onClick={() => paginate2(currentPage2 + 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2 + 1}
									</button>
									<button
										onClick={() => paginate(currentPage2 + 2)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2 + 2}
									</button>
								</>
							)}
							{currentPage2 > 1 && currentPage2 < limitPage2 && (
								<>
									<button
										onClick={() => paginate2(currentPage2 - 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{" "}
										{currentPage2 - 1}
									</button>
									<button
										onClick={() => paginate(currentPage2)}
										disabled
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2}
									</button>
									<button
										onClick={() => paginate2(currentPage2 + 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2 + 1}
									</button>
								</>
							)}
							{currentPage2 > 1 && currentPage2 == limitPage2 && (
								<>
									<button
										onClick={() => paginate(currentPage2 - 2)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{" "}
										{currentPage2 - 2}
									</button>
									<button
										onClick={() => paginate2(currentPage2 - 1)}
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2 - 1}
									</button>
									<button
										onClick={() => paginate(currentPage2)}
										disabled
										className="border-0 fs-3 px-3 bg-transparent"
									>
										{currentPage2}
									</button>
								</>
							)}
						</>
					)}
				</span>
				<button
					onClick={() => {
						paginate(currentPage2 + 1);
					}}
					className="border-0 bg-transparent"
					disabled={limitPage2 <= currentPage2}
				>
					<img style={{ width: "40px", height: "40px" }} src={ArrowRight} />
				</button>
			</div>
		</>
	);
}

export default Support;
