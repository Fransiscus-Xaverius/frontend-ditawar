import { Form, Navigate } from "react-router-dom";
import { useState } from "react";
function Rating() {
	let userToken = localStorage.getItem("token");
	const [rating, setRating] = useState(1);
	const [text, setText] = useState("");
	const handleRatingChange = (value) => {
		setRating(value);
	};
	const handleSubmit = (event) => {
		
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
			{!userToken && <Navigate to={"/login"}/>}
            {userToken == "admin" && <Navigate to={"/login"}/>}
			<h1 className="mt-4">Beri Penilaian</h1>
			<div>
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
					></textarea>
					<br />
					<p> {getWordCount()}/400</p>
					<button type="submit" className="btn text-white p-2" style={{ width: "130px" , backgroundColor: "#06083D", textTransform: "uppercase", borderRadius: "10px"}}><b>Submit</b></button>
				</Form>
			</div>
		</div>
	);
}

export default Rating;
