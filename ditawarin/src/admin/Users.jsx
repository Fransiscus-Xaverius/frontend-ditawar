import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Eye from "../assets/eye.png";

function Users() {
	return (
		<>
			<p className="fw-bold">USERS</p>
			<p>More than 10+ new users</p>
			<table className="table">
				<thead>
					<tr className="table-success">
						<th scope="col">NAMA</th>
						<th scope="col">ROLE</th>
						<th scope="col">STATUS</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>
							<button className="bg-primary opacity-75 border-0 rounded-2 mx-2">
								<img src={Eye} style={{ width: "35px" }} />
							</button>
							<button className="bg-primary opacity-75 border-0 rounded-2 mx-2">
								<img src={Edit} style={{ width: "35px" }} />
							</button>
							<button className="bg-primary opacity-75 border-0 rounded-2">
								<img src={Ban} style={{ width: "35px" }} />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default Users;
