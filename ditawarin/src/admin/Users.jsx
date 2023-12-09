import { useLoaderData } from "react-router-dom";
import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Accept from "../assets/accepted.png";
import client from "../client";

function Users() {
	const User = useLoaderData();
	console.log(User);

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

	return (
		<>
			<p className="fw-bold">USERS</p>
			<table
				className="table"
				style={{
					overflowY: "scroll",
					overflowX: "hidden",
					height: "50vh",
					width: "100%",
					display: "block",
				}}
			>
				<thead>
					<tr className="table-success">
						<th scope="col">PROFILE</th>
						<th scope="col">NAMA</th>
						<th scope="col">EMAIL</th>
						<th scope="col">PHONE NUMBER</th>
						<th scope="col">STATUS</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{User.map((user, index) => {
						let url =
							import.meta.env.VITE_API_URL + "/static/" + user.profile_picture;
						return (
							<tr className="table-light">
								<td>
									<img src={`${url}`} style={{ width: "100px" }} />
								</td>
								<td>{user.nama}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>
									{user.role == "unverified" && (
										<p className="bg-success">Unverified</p>
									)}
									{user.role == "verified" && (
										<p className="bg-primary">Verified</p>
									)}
									{user.role == "banned" && <p className="bg-danger">Banned</p>}
								</td>
								<td className="w-100">
									<button className="mx-1 border-0 bg-primary rounded" onClick={() => ActiveAccount(index)}>
										<img src={Accept} style={{ width: "30px" }} />
									</button>
									<button className="mx-1 border-0 bg-primary rounded">
										<img src={Edit} style={{ width: "30px" }} />
									</button>
									<button className="mx-1 border-0 bg-primary rounded" onClick={() => BanAccount(index)}>
										<img src={Ban} style={{ width: "30px" }} />
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

export default Users;
