import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./Register.jsx";
import Logout from "./Logout.jsx";
import JualPage from "./JualPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import NavbarAdmin from "./admin/NavbarAdmin.jsx"
import Users from "./admin/Users.jsx"
import Auctions from "./admin/Auctions.jsx"
import Payment from "./admin/Payment.jsx"
import Security from "./admin/Security.jsx"
import Support from "./admin/Support.jsx"
import ItemListing from "./ItemListing.jsx"
import AuctionPage from "./AuctionPage.jsx";

import DataHandler from "./data/DataHandler.jsx";

const {getAuction, getAllAuction, getUserData} = DataHandler;

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navbar />,
		children: [
			{
				index: true,
				loader: getAllAuction,
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/logout",
				element: <Logout />,
			},
			{
				path: "/profile",
				loader:getUserData,
				element: <ProfilePage />,
			},
			{
				path: "/sell",
				element: <JualPage />,
			},
			{
				path: "/listing",
				element: <ItemListing />,
				children: [
					{
						path: ":id",
						loader: getAuction,
						element: <AuctionPage />,
					},
				]
			}

		],
	},
	{
		path: "/admin",
		element: <NavbarAdmin />,
		children: [
			{
				path: "users",
				element: <Users />,
			},
			{
				path: "auction",
				element: <Auctions />,
			},
			{
				path: "payment",
				element: <Payment />,
			},
			{
				path: "security",
				element: <Security />,
			},
			{
				path: "support",
				element: <Support />,
			},
		],
	},
	
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />,
);
