import { Navigate, Outlet } from "react-router-dom";

export default function ItemListing() {
	let userToken = localStorage.getItem("token");

	return (
		<>
			{!userToken && <Navigate to={"/login"} />}
			{userToken == "admin" && <Navigate to={"/login"} />}
			<Outlet />
		</>
	);
}
