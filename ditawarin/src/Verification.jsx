import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import client from "./client";
import dotenv from "dotenv";
import { Navigate, useNavigate } from "react-router-dom";
export default function Verification() {
	const [Loading, setLoading] = useState(false);
	const [Timer, setTimer] = useState(
		localStorage.getItem("timer") ?? localStorage.getItem("duration"),
	);
	const navigate = useNavigate();
	const sendOTP = async () => {
		localStorage.setItem(
			"OTP",
			Math.random().toString(36).split(".")[1].slice(0, 4),
		);
		const Email = localStorage.getItem("email");
		await client.post("/sendmail?email=" + Email, {
			msg: `KODE OTP ANDA ADALAH ${localStorage.getItem("OTP")}`,
			subject: "KODE OTP",
		});
		setLoading(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (Timer > 0) {
				setTimer(Timer - 1);
			} else {
				localStorage.removeItem("OTP");
				setLoading(true);
			}
		}, 1000);
		localStorage.setItem("duration", Timer);
	});

	useEffect(() => {
		if (Timer == 30) {
			localStorage.removeItem("timer");

			sendOTP();
			setLoading(false);
		}
	}, [Timer]);

	const { register, handleSubmit, reset } = useForm();

	const onSubmit = async (data) => {
		if (data.OTP == localStorage.getItem("OTP")) {
			alert("Kode OTP benar!");
			try {
				const result = await client.put(
					`/verification?id=${localStorage.getItem("id_user")}`,
				);
				localStorage.removeItem("timer")
				localStorage.removeItem("email");
				localStorage.removeItem("id_user")
				navigate("/login");
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Kode OTP salah!");
			reset();
		}
	};

	return (
		<>
			{
				localStorage.getItem("user") &&
				<Navigate to="/" />
			}
			<div className="container-fluid d-flex justify-content-center align-items-center">
				<h1 className="fw-bolder">VERIFIKASI</h1>
			</div>
			<form className="text-center" onSubmit={handleSubmit(onSubmit)}>
				<h2>MASUKKAN KODE OTP</h2>
				<br />
				<input id='otp' type="text" className="text-center py-2" {...register("OTP")} />
				<br />
				<br />
				<button
					id="redeem_otp_btn"
					style={{ backgroundColor: "#06083D" }}
					className="rounded-1 px-3 py-1 text-light fw-bold fs-4"
					type="submit"
				>
					REDEEM
				</button>
				<br />
				<br />
			</form>
			<div className="text-center">
				{Loading && (
					<button
						className="bg-transparent text-primary border-0"
						onClick={() => setTimer(30)}
					>
						KIRIM ULANG?
					</button>
				)}
				<br />
				{!Loading && <b>Waktu Tunggu : {Timer}</b>}
			</div>
		</>
	);
}
