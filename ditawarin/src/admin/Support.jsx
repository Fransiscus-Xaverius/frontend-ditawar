import Eye from "../assets/eye.png";
import Ban from "../assets/ban.png";

function Support() {
	return (
		<>
			<p className="fw-bold">USERS FEEDBACK</p>
			<table className="table">
				<thead>
					<tr className="table-success">
						<th scope="col">NAMA</th>
						<th scope="col">MESSAGE</th>
						<th scope="col">RATING</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td>⭐⭐⭐⭐⭐</td>
						<td>
							<button className="bg-primary opacity-75 border-0 rounded-2 mx-2">
								<img src={Eye} style={{ width: "35px" }} />
							</button>
							<button className="bg-primary opacity-75 border-0 rounded-2">
								<img src={Ban} style={{ width: "35px" }} />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<p className="fw-bold">CUSTOMER SERVICE</p>
			<table className="table">
				<thead>
					<tr className="table-success">
						<th scope="col">NAMA</th>
						<th scope="col">MESSAGE</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td>
							<button className="bg-primary opacity-75 border-0 rounded-2 mx-2">
								<img src={Eye} style={{ width: "35px" }} />
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

export default Support;
