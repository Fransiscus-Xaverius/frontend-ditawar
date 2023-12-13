import { useLoaderData } from "react-router-dom";
import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Accept from "../assets/accepted.png";
import client from "../client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DoughnutChart from "../components/DoughnutChart";

function Users() {
	const User = useLoaderData();
	const [ListUser, setListUser] = useState(null);
	const [Editing, setEditing] = useState(false);

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

	return (
		<>
			<div style={{width : "40%"}}>
				<DoughnutChart Trans={trans} UserA={useraktif} UserN={usernonaktif} />
			</div>
			<p className="fw-bold">USERS</p>
			{!Editing && (
				<table
					className="table"
					style={{
						overflowY: "scroll",
						overflowX: "hidden",
						height: "50vh",
						display: "block",
					}}
				>
					<thead>
						<tr className="table-success">
							<th scope="col">PROFILE</th>
							<th scope="col">NAMA</th>
							<th scope="col">STATUS</th>
							<th scope="col">ACTION</th>
						</tr>
					</thead>
					<tbody>
						{User.map((user, index) => {
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
		</>
	);
}

export default Users;
