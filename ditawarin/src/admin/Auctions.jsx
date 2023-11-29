import Ban from "../assets/ban.png";
import Edit from "../assets/edit.png";
import Check from "../assets/check.png";
import { Form, useLoaderData } from "react-router-dom";

function Auctions() {
	const Auction = useLoaderData();
	console.log(Auction);
	return (
		<>
			<p className="fw-bold">AUCTION</p>
			<p>More than 10+ new auctions</p>
			<table className="table" style={{overflowY:"scroll", overflowX:"hidden", height:"55vh", display:"block"}} >
				<thead>
					<tr className="table-success">
						<th scope="col">PRODUCT</th>
						<th scope="col">PRICE</th>
						<th scope="col">STATUS</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{Auction.map((act) => {
						let url =import.meta.env.VITE_API_URL+'/static/'+act.item.images;
						const date = new Date(act.tanggal_selesai);
						return (
							<tr>
								<td>
									<img src={`${url}`} />
									{act.item.nama}
								</td>
								<td>{act.asking_price}</td>
								<td className="bg-success text-center">
									{date.getTime() - Date.now() >= 0 && <div>PROGRESS</div>}
									{date.getTime() - Date.now() < 0 && <div>DONE</div>}
								</td>
								<td className="d-flex">
									<Form className="mx-3">
										<button className="bg-warning">WARNING</button>
									</Form>
									<Form>
										<button className="bg-danger">STOP</button>
									</Form>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Auctions;
