import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";

function Auctions() {
	return (
		<table className="table table-bordered">
			<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Nama User</th>
					<th scope="col">Role</th>
					<th scope="col" style={{width:"175px"}}>Pilih Aksi</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>
						<button className="bg-transparent border-0">
							<img src={Ban} alt="" />
						</button>
						<button className="bg-transparent border-0">
							<img src={Edit} alt="" />
						</button>
						<button className="bg-transparent border-0">
							<img src={Check} alt="" />
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default Auctions;
