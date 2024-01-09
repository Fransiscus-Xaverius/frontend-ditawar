import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import DetailsPage from "./DetailsPage.jsx";
import Report from "./admin/Report.jsx";
import Laporan from "./Report.jsx";
import { get } from "react-hook-form";
import Verification from "./Verification.jsx";
import PayoutPage from "./PayoutPage.jsx";
import { Provider } from 'react-redux'
import store from "./app/store.js"
import Dashboard from './mui-admin/homeAdmin.jsx';
import UsersPage from "./mui-admin/Users.jsx";
import AuctionsPage from "./mui-admin/Auctions.jsx";
import ReportsPage from "./mui-admin/ReportsPage.jsx";
import SupportPage from "./mui-admin/SupportsPage.jsx";
import TransactionsPage from "./mui-admin/TransactionsPage.jsx";

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
  getPurchaseDetails,
  getAllPurchase,
  getAllSupport
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: getSampleAuction,
        element: <Home />,
      },
      {
        path: "/verification",
        element: <Verification />,
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
        path: "/payout",
        loader: getWallet,
        element: <PayoutPage />
      },
      {
        path: "/details",
        children: [
          {
            path: ":id",
            loader: getPurchaseDetails,
            element: <DetailsPage />,
          }
        ]
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
          }
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
        loader: getUserData,
        path: "/feedback",
        element: <Rating />,
      },
      {
        loader: getUserData,
        path: "/service",
        element: <Laporan />
      }

    ],
  },
  {
    loader: getAllUser,
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        loader: getAllPurchase,
        path: "/admin",
        element: <ReportsPage />
      },
      {
        loader: getAllUser,
        path: "users",
        element: <UsersPage />,
      },
      {
        loader: getAllAuctionDetail,
        path: "auctions",
        element: <AuctionsPage />,
      }, {
        loader: getAllPurchase,
        path: "payment",
      }, {
        loader: getAllSupport,
        path: "support",
        element: <SupportPage />
      }
      , {
        loader: getAllPurchase,
        path: "transactions",
        element: <TransactionsPage />
      }
    ]
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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
