import {
	Link,
	NavLink,
	Navigate,
	Outlet,
	useLoaderData,
} from "react-router-dom";

import Users from "../assets/users.png";
import Auction from "../assets/auction.png";
import Payment from "../assets/payment.png";
import Support from "../assets/support.png";
import Report from "../assets/report.png";
import { useEffect, useState } from "react";
import client from "../client";

function NavbarAdmin() {
	let userToken = localStorage.getItem("token");
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const [useraktif, setuseraktif] = useState(0);
	const [usernonaktif, setusernonaktif] = useState(0);
	const [trans, settrans] = useState(0);

	const getTime = () => {
		setSeconds((time) => time + 1);
		if (seconds == 60) {
			setSeconds(0);
			setMinutes((time) => time + 1);
		}
		if (minutes == 60) {
			setMinutes(0);
			setHours((time) => time + 1);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => getTime(), 1000);
		return () => clearInterval(interval);
	}, [seconds]);

	const AllUser = async () => {
		const result = (await client.get("/allUser")).data.result;
		setuseraktif(result.filter((user) => user.role == "verified").length);
		setusernonaktif(
			result.filter(
				(user) => user.role == "unverified" || user.role == "banned",
			).length,
		);
	};

	const AllTrans = async () => {
		const result = (await client.get("/allTransactions")).data;
		settrans(result.length);
	};

	useEffect(() => {
		AllUser();
		AllTrans();
	}, []);

	return (
		<div
			className="container-fluid p-0 d-flex fontcustom"
			style={{ display: "block", minHeight: "100vh" }}
		>
			{!userToken && <Navigate to={"/login"} />}
			{userToken != "admin" && <Navigate to={"/login"} />}
			<div
				className="container-fluid p-0 d-flex flex-column flex-grow-1"
				style={{ display: "block", minHeight: "100vh" }}
			>
				<nav className="container-fluid" style={{ backgroundColor: "#06083D", position: "fixed" }}>
						<div className="d-flex justify-content-between align-items-center px-3">
							<NavLink
								to="/admin"
								className="fs-1 fw-bold text-decoration-none text-white"
							>
								Lelang
							</NavLink>
							<h3 className="float-end ms-auto me-3 text-white">
								{hours < 10 && 0}
								{hours}:{minutes < 10 && 0}
								{minutes}:{seconds < 10 && 0}
								{seconds}
							</h3>
							<button
								className="rounded-0"
								style={{ width: "100px", height: "40px" }}
							>
								<NavLink
									to={"/logout"}
									className="text-decoration-none text-black fw-bolder"
								>
									KELUAR
								</NavLink>
							</button>
						</div>
				</nav>
				<div className="container-fluid">
					<div className="row" style={{ width: "100%", height: "95vh" }}>
						<div
							className="col-3 p-5 align-items-center"
							style={{ backgroundColor: "#06083D", height: "100%", position: "fixed", marginTop:"60px" }}
						>
							<NavLink to="users" className="text-decoration-none text-white">
								<img src={Users} style={{ width: "35px" }} className="py-2" />
								<b className="px-3">USERS</b>
							</NavLink>
							<br />
							<NavLink to="auction" className="text-decoration-none text-white">
								<img src={Auction} style={{ width: "35px" }} className="py-2" />
								<b className="px-3">AUCTIONS</b>
							</NavLink>
							<br />
							<NavLink to="payment" className="text-decoration-none text-white">
								<img src={Payment} style={{ width: "35px" }} className="py-2" />
								<b className="px-3">PAYMENT</b>
							</NavLink>
							
							<br />
							<NavLink to="support" className="text-decoration-none text-white">
								<img src={Support} style={{ width: "35px" }} className="py-2" />
								<b className="px-3">SUPPORT</b>
							</NavLink>
							<br />
							<NavLink to="report" className="text-decoration-none text-white">
								<img src={Report} style={{ width: "35px" }} className="py-2" />
								<b className="px-3">REPORT</b>
							</NavLink>
							<br />
						</div>
						<div className="col-3">

						</div>
						<div className="col-9 p-5">
							<div className="row bg-white pt-3" style={{position: "fixed", width: "80%", marginTop: "12px" }}>
								<div className="col-4">
									<div
										className="card mb-3 p-3 opacity-50"
										style={{
											width: "300px",
											height: "150px",
											backgroundColor: "#0976C4",
										}}
									>
										<div className="card-body text-success align-items-center text-light">
											<h1 className="card-title text-center">{trans}</h1>
										</div>
										<div className="footer text-light">TRANSACTION</div>
									</div>
								</div>
								<div className="col-4">
									<div
										className="card mb-3 p-3 opacity-50"
										style={{
											width: "300px",
											height: "150px",
											backgroundColor: "#50C409",
										}}
									>
										<div className="card-body text-success align-items-center text-light">
											<h1 className="card-title text-center">{useraktif}</h1>
										</div>
										<div className="footer text-light">USER AKTIF</div>
									</div>
								</div>
								<div className="col-4">
									<div
										className="card mb-3 p-3 opacity-50"
										style={{
											width: "300px",
											height: "150px",
											backgroundColor: "#C40909",
										}}
									>
										<div className="card-body text-success align-items-center text-light">
											<h1 className="card-title text-center">{usernonaktif}</h1>
										</div>
										<div className="footer text-light">USER NONAKTIF</div>
									</div>
								</div>
							</div>
							<div style={{marginTop:"220px"}}>
								<Outlet />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavbarAdmin;
