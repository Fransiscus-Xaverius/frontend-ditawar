import { Form, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import client from "./client";
function Rating() {
	let userToken = localStorage.getItem("token");
	let user = useLoaderData();
	const [rating, setRating] = useState(1);
	const [text, setText] = useState("");
	const handleRatingChange = (value) => {
		setRating(value);
	};
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		try{
			// await client.post(`feedback?id_user=${user._id}&id_auction=${localStorage.getItem("auction")}`, {
				// 	rating: rating,
				// 	review: text,
				// });
			const auction = localStorage.getItem("auction");
			const buyer = localStorage.getItem("buyer");
			const seller = localStorage.getItem("seller");
			await client.post('/rating?buyer='+buyer+'&seller='+seller+'&auction='+auction+'&rating='+rating+'&comment='+text);
		}
		catch(error){
			alert(error);
		}
		navigate(-1);
	};
	const handleTextChange = (event) => {
		const newText = event.target.value;
		setText(newText);
	};
	const getWordCount = () => {
		const words = text.trim().split(/\s+/);
		return words.length;
	};
	return (
		<div className="text-center">
			{!userToken && <Navigate to={"/login"} />}
			{userToken == "admin" && <Navigate to={"/login"} />}
			<div className="fontcustom">
				<h1 className="mt-4">Beri Penilaian</h1>
				<p><b>Apakah anda puas dengan pelayanan kami?</b></p>
				<Form onSubmit={handleSubmit}>
					{[1, 2, 3, 4, 5].map((value) => (
						<label key={value}>
							<input
								type="radio"
								name="rating"
								value={value}
								onChange={() => handleRatingChange(value)}
								hidden
							/>
							<div className="fs-1 me-2" style={{ color: "#ffcc00" }}>
								{value <= (rating || 0) ? <p>★</p> : <p>☆</p>}
							</div>
						</label>
					))}
					<br />
					<textarea
						cols="75"
						rows="10"
						value={text}
						onChange={handleTextChange}
						placeholder="Tulis Review"
						className="p-4"
						style={{borderRadius: "10px"}}
					></textarea>
					<br />
					<p> {getWordCount()}/400 Word</p>
					<button
						type="submit"
						className="btn text-white p-2"
						style={{
							width: "130px",
							backgroundColor: "#06083D",
							textTransform: "uppercase",
							borderRadius: "10px",
						}}
					>
						<b>Submit</b>
					</button>
				</Form>
			</div>
		</div>
	);
}

export default Rating;
