import { Link, NavLink, Outlet } from "react-router-dom";

import Users from "../assets/users.png";
import Auction from "../assets/auction.png";
import Payment from "../assets/payment.png";
import Security from "../assets/security.png";
import Support from "../assets/support.png";

function NavbarAdmin() {
	return (
		<nav>
			<div className="container-fluid" style={{ backgroundColor: "darkblue" }}>
				<div className="d-flex justify-content-between align-items-center px-3">
					<NavLink
						to="/admin"
						className="fs-1 fw-bold text-decoration-none text-white"
					>
						Lelang
					</NavLink>
					<h3 className="float-end ms-auto me-3 text-white">00:00:00</h3>
					<button
						className="rounded-0"
						style={{ width: "100px", height: "40px" }}
					>
						<Link
							to={"/"}
							className="text-decoration-none text-black fw-bolder"
						>
							KELUAR
						</Link>
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-3 p-5" style={{ backgroundColor: "darkblue" }}>
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
					<NavLink to="security" className="text-decoration-none text-white">
						<img src={Security} style={{ width: "35px" }} className="py-2" />
						<b className="px-3">SECURITY</b>
					</NavLink>
					<br />
					<NavLink to="support" className="text-decoration-none text-white">
						<img src={Support} style={{ width: "35px" }} className="py-2" />
						<b className="px-3">SUPPORT</b>
					</NavLink>
					<br />
				</div>
				<div className="col-9 p-5">
					<Outlet />
				</div>
			</div>
		</nav>
	);
}

export default NavbarAdmin;
