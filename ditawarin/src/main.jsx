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
import NavbarAdmin from "./admin/NavbarAdmin.jsx";
import Users from "./admin/Users.jsx";
import Auctions from "./admin/Auctions.jsx";
import Payment from "./admin/Payment.jsx";
import Security from "./admin/Security.jsx";
import Support from "./admin/Support.jsx";
import ItemListing from "./ItemListing.jsx";
import AuctionPage from "./AuctionPage.jsx";
import SearchPage from "./SearchPage.jsx";
import DataHandler from "./data/DataHandler.jsx";
import Rating from "./Rating.jsx";
import WalletPage from "./WalletPage.jsx";
import WelcomeBack from "./WelcomeBack.jsx";
import PurchasesPage from "./PurchasesPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import PurchasePageBuyer from "./PurchasePageBuyer.jsx";
import PurchasePageSeller from "./PurchasePageSeller.jsx";
import UpdatePage from "./UpdatePage.jsx";

const {
  getAuction,
  getAllAuction,
  getUserData,
  getAuctionData,
  getAllAuctionDetail,
  getSampleAuction,
  getAuctionByQuery,
  NavBarData,
  getWallet,
  getAllPurchaseAsBuyer,
  getAllPurchaseAsSeller,
  getAllUser,
} = DataHandler;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Navbar />,
    loader: NavBarData,
    children: [
      {
        index: true,
        loader: getSampleAuction,
        element: <Home />,
      },
      {
        path: "/search",
        children: [
          {
            path: ":query",
            loader: getAuctionByQuery,
            element: <SearchPage />,
          },
        ],
      },
      
      {
        path: "/profile",
        loader: getUserData,
        element: <ProfilePage />,
      },
      {
        path: "/wallet",
        loader: getWallet,
        element: <WalletPage />,
      },
      {
        path: "/purchases",
        element: <PurchasesPage />,
        children: [
          {
            path: "buyer",
            loader: getAllPurchaseAsBuyer,
            element: <PurchasePageBuyer />,
          },
          {
            path: "seller",
            loader: getAllPurchaseAsSeller,
            element: <PurchasePageSeller />,
          },
        ],
      },
      {
        path: "/sell",
        element: <JualPage />,
      },
      {
        path: "/edit/:id",
        loader: getAuctionData,
        element: <UpdatePage />,
      },
      {
        path: "/listing",
        element: <ItemListing />,
        children: [
          {
            path: ":id",
            loader: getAuctionData,
            element: <AuctionPage />,
          },
        ],
      },
      {
        path: "/rating",
        element: <Rating />,
      },
    ],
  },
  {
    loader: getAllUser,
    path: "/admin",
    element: <NavbarAdmin />,
    children: [
      {
        loader: getAllUser,
        path: "users",
        element: <Users />,
      },
      {
        loader: getAllAuctionDetail,
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
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

console.log(router.routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
