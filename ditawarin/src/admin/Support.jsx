import Accept from "../assets/accepted.png";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../client";

function Support() {
	const support = useLoaderData();
	const [Feedback, setFeedback] = useState([]);
	const [Service, setService] = useState([]);

	function handleFeedback() {
		support.feedback.map(async (item) => {
			const result = await client.get(`/user?id=${item.id_user}`);
			console.log(result.data.result);
			setFeedback([
				...Feedback,
				{
					user: result.data.result.nama,
					message: item.review,
					rating: item.rating,
				},
			]);
		});
	}
	function handleService() {
		support.service.map(async (item) => {
			const result = await client.get(`/user?id=${item.id_user}`);
			const result2 = await client.get(`/auction?id=${item.id_auction}`);
			const result3 = await client.get(
				`/item?id=${result2.data.result.id_barang}`,
			);
			console.log(result.data.result);
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

	useEffect(() => {
		handleFeedback();
		handleService();
	}, []);

	async function sendEmail(email) {
		await client.post("/sendmail?email=" + email, {
			msg: "Terima kasih telah menghubungi kami, kami akan segera memproses laporan anda",
		});
	}

	return (
		<>
			{console.log(Feedback)}
			<p className="fw-bold">USERS FEEDBACK</p>
			<table className="table">
				<thead>
					<tr className="table-success">
						<th scope="col">NAMA</th>
						<th scope="col">MESSAGE</th>
						<th scope="col">RATING</th>
					</tr>
				</thead>
				<tbody>
					{Feedback.map((item) => {
						let url = import.meta.env.VITE_API_URL + "/static/" + item.profile;
						return (
							<tr>
								<td>{item.user}</td>
								<td>{item.message}</td>
								<td>
									{[...Array(item.rating)].map((item) => {
										return <span>⭐</span>;
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<p className="fw-bold">CUSTOMER SERVICE</p>
			<table className="table">
				<thead>
					<tr className="table-success">
						<th scope="col">NAMA</th>
						<th scope="col">AUCTION</th>
						<th scope="col">MESSAGE</th>
						<th scope="col">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{Service.map((item) => {
						const url = import.meta.env.VITE_API_URL + "/static/" + item.img;
						return (
							<tr>
								<td>{item.user}</td>
								<td>
									<img src={url} style={{ width: "200px" }} />
									<br />
									<h3>{item.item}</h3>
								</td>
								<td>{item.message}</td>
								<td>
									<button
										onClick={() => sendEmail(item.email)}
										className="bg-transparent border-0"
									>
										<img src={Accept} style={{ width: "40px" }} />
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

export default Support;
