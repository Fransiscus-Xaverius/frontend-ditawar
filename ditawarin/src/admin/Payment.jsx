import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import Eye from "../assets/eye.png";
import BarChart from "../components/BarChart";

function Payment() {
	return (
		<>
			<table className="table">
				<thead>
					<tr className="table-success">
						<th>PRODUCT</th>
						<th>PRICE</th>
						<th>STATUS</th>
						<th>RATING</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>Rp. </td>
						<td style={{ width: "100px" }}>
							<div className="bg-success rounded text-center p-1">DONE</div>
						</td>
						<td>⭐⭐⭐⭐⭐</td>
						<td className="w-20">
							<button className="bg-secondary rounded border-0">
								<img src={Eye} style={{ width: "35px" }} />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<BarChart />
		</>
	);
}

export default Payment;
