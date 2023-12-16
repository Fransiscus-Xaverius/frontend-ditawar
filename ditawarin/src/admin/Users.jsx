import { useLoaderData } from "react-router-dom";
import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Accept from "../assets/accepted.png";
import Eye from "../assets/eye.png";
import client from "../client";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import DoughnutChart from "../components/DoughnutChart";
import ArrowLeft from "../assets/arrowLeft.png";
import ArrowRight from "../assets/arrowRight.png";
import LineUser from "../components/LineUser";

function Users() {
	const User = useLoaderData();
	const [ListUser, setListUser] = useState(null);
	const [Editing, setEditing] = useState(false);
	const [useraktif, setuseraktif] = useState(0);
	const [usernonaktif, setusernonaktif] = useState(0);
	const [trans, settrans] = useState(0);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [Look, setLook] = useState(false);
	const [topup, setTopup] = useState([]);
	const [sale, setSale] = useState([]);
	const [purchase, setPurchase] = useState([]);

	function ActiveAccount(params) {
		try {
			const result = client.put(`/verification?id=${User[params]._id}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	function BanAccount(params) {
		try {
			const result = client.put(`/banned?id=${User[params]._id}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	async function LookAccount(params) {
		try{
			setTopup([]);
			setSale([]);
			setPurchase([]);
			const wallet = await client.get(`/wallet?id=${User[params]._id}`);
			const topup2 = await client.get(`/transaction-topup?id=${wallet.data.result._id}`);
			const sale2 = await client.get(`/transaction-sale?id=${wallet.data.result._id}`);
			const purchase2 = await client.get(`/transaction-purchase?id=${wallet.data.result._id}`);
			topup2.data.result.forEach(element => {
				setTopup([...topup,element.invoice.amount]);
			});
			console.log(sale2.data.result)
			sale2.data.result.forEach(element => {
				setSale([...sale,element.amount]);
			})
			purchase2.data.result.forEach(element => {
				setPurchase([...purchase,element.amount]);
			})
			setLook(true);
		}catch(error){
			console.log(error);
			setLook(false);
		}
	}

	function EditAccount(params) {
		setEditing(true);
		setListUser(params);
	}

	const { handleSubmit, register } = useForm({
		values: {
			_id: ListUser?._id,
			nama: ListUser?.nama,
			email: ListUser?.email,
			phone: ListUser?.phone,
			city: ListUser?.city,
			profile_picture: ListUser?.profile_picture,
		},
	});

	async function EditUser(Data) {
		try {
			const user = await client.put("/user?id=" + Data._id, {
				nama: Data.nama,
				email: Data.email,
				phone: Data.phone,
				city: Data.city,
				profile_picture: Data.profile_picture,
			});
		} catch (error) {
			console.log(error);
			alert(error);
		}
		window.location.reload(true);
	}

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

	const filteredData = User.filter((usr) =>
		usr.nama.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
	const limitPage = Math.ceil(User.length / itemsPerPage);
	console.log(limitPage)
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	return (
		<>
			<div style={{ width: "40%" }}>
				<DoughnutChart Trans={trans} UserA={useraktif} UserN={usernonaktif} />
			</div>
			<p className="fw-bold">USERS</p>
			<input
				type="text"
				value={search}
				onChange={handleSearch}
				placeholder="Search..."
				className="form-control my-3"
			/>
			{!Editing && (
				<table className="table">
					<thead>
						<tr className="table-success">
							<th scope="col">PROFILE</th>
							<th scope="col">NAMA</th>
							<th scope="col">EMAIL</th>
							<th scope="col">STATUS</th>
							<th scope="col">ACTION</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map((user, index) => {
							let url =
								import.meta.env.VITE_API_URL +
								"/static/" +
								user.profile_picture;

							return (
								<tr className="table-light">
									<td className="w-20">
										<img src={`${url}`} style={{ width: "100px" }} />
									</td>
									<td className="w-25">{user.nama}</td>
									<td className="w-25">{user.email}</td>
									<td className="w-25">
										{user.role == "unverified" && (
											<p className="bg-success">Unverified</p>
										)}
										{user.role == "verified" && (
											<p className="bg-primary">Verified</p>
										)}
										{user.role == "banned" && (
											<p className="bg-danger">Banned</p>
										)}
									</td>
									<td className="w-100">
										<button
											className="mx-1 border-0 bg-primary rounded"
											onClick={() => LookAccount(index)}
										>
											<img src={Eye} style={{ width: "30px" }} />
										</button>
										<button
											className="mx-1 border-0 bg-primary rounded"
											onClick={() => ActiveAccount(index)}
										>
											<img src={Accept} style={{ width: "30px" }} />
										</button>
										<button
											className="mx-1 border-0 bg-primary rounded"
											onClick={() => EditAccount(user)}
										>
											<img src={Edit} style={{ width: "30px" }} />
										</button>
										<button
											className="mx-1 border-0 bg-primary rounded"
											onClick={() => BanAccount(index)}
										>
											<img src={Ban} style={{ width: "30px" }} />
										</button>
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
					{limitPage >= 2 && (
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
			{Editing && (
				<form onSubmit={handleSubmit(EditUser)}>
					<label className="me-3">Nama : </label>
					<input type="text" {...register("nama")} style={{ width: "250px" }} />
					<br />
					<label className="me-3">Email : </label>
					<input
						type="text"
						{...register("email")}
						style={{ width: "250px" }}
					/>
					<br />
					<label className="me-3">Phone Number : </label>
					<input
						type="text"
						{...register("phone")}
						style={{ width: "250px" }}
					/>
					<br />
					<label className="me-3">Kota :</label>
					<input type="text" {...register("city")} />
					<br />

					<input type="hidden" {...register("profile_picture")} />
					<button
						type="submit"
						className="bg-success rounded my-3"
						{...register("_id")}
					>
						Edit
					</button>

					<button
						onClick={() => setEditing(false)}
						className="bg-primary rounded mx-2"
					>
						Cancel
					</button>
				</form>
			)}

			{Look && <>
				<h1>Topup</h1>
				<LineUser name={'topup'} data={topup}/>
				<h1>Sale</h1>
				<LineUser name={"sale"} data={sale} />
				<h1>Purchase</h1>
				<LineUser name={"purchase"} data={purchase} />
			</>
			}
		</>
	);
}

export default Users;
