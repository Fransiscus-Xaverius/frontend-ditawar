import { redirect } from "react-router-dom";
import client from "../client";
import axios from "axios";

const getPurchaseDetails = async (data) => {
	const { params } = data;
	const { id } = params;
	const user = await getUserData();
	// console.log(user);
	const result = await client.get(`/purchase-detail?id=${id}`);
	let role = "buyer";
	if (user._id != result.data.result.buyer._id) {
		role = "seller";
	}
	const item = (await getItem(result.data.result.item._id)).data.result;
	// console.log(item)
	const p = {
		auction: result.data.result.auction,
		buyer: result.data.result.buyer,
		seller: result.data.result.seller,
		purchase: result.data.result.purchase,
		item: item,
		role: role,
	};

	return p;
};

const getAuction = async (data) => {
	const { params } = data;
	const { id } = params;
	const token = localStorage.getItem("token");
	const result = await client.get(`/auction?id=${id}`);
	console.log(result.data);
	const item_id = result.data.result.id_barang;
	console.log(item_id);
	const result2 = await getItem(item_id);
	console.log(result2);

	const auction = {
		auctiondata: result.data.result,
		itemdata: result2.data.result,
	};
	return auction;
};

const getBid = async (id) => {
	const result = await client.get(`/bid?id=${id}`);
	return result;
};

const getAuctionData = async (data) => {
	const auction = await getAuction(data);
	const user = await getUserData();
	let highest_bid = auction.auctiondata.highest_bid;
	console.log(highest_bid);

	if (highest_bid) {
		highest_bid = await getBid(auction.auctiondata.highest_bid);
	}

	const result = {
		auctiondata: auction.auctiondata,
		itemdata: auction.itemdata,
		userdata: user,
	};

	if (highest_bid) {
		result.highest_bid = highest_bid.data.result;
	}

	return result;
};

const getAllPurchaseAsBuyer = async () => {
	const token = localStorage.getItem("token");
	const result = await client.get(`/allPurchaseAsBuyer?token=${token}`);
	for (let i = 0; i < result.data.result.length; i++) {
		console.log("aaa");
		console.log(result.data.result[i].item);
		const item = (await getItem(result.data.result[i].item)).data.result;
		const user = await getUserById(result.data.result[i].seller);
		const auction_data = await getAuctionData({
			params: { id: result.data.result[i].auction },
		});
		const transaction = await client.get(
			`/transaction?id=${result.data.result[i].transaction}&token=${token}`,
		);
		console.log(transaction);
		// console.log(auction_data);
		result.data.result[i].auctiondata = auction_data.auctiondata;
		result.data.result[i].seller = user;
		result.data.result[i].item = item;
		result.data.result[i].transaction = transaction.data.result;
	}
	console.log(result);
	return result;
};

const getAllPurchaseAsSeller = async () => {
	const token = localStorage.getItem("token");
	const result = await client.get(`/allPurchaseAsSeller?token=${token}`);
	for (let i = 0; i < result.data.result.length; i++) {
		console.log("aaa");
		console.log(result.data.result[i].item);
		const item = (await getItem(result.data.result[i].item)).data.result;
		const user = await getUserById(result.data.result[i].buyer);
		const auction_data = await getAuctionData({
			params: { id: result.data.result[i].auction },
		});
		const transaction = await client.get(
			`/transaction?id=${result.data.result[i].transaction}&token=${token}`,
		);
		result.data.result[i].auctiondata = auction_data.auctiondata;
		result.data.result[i].seller = user;
		result.data.result[i].item = item;
		result.data.result[i].transaction = transaction.data.result;
	}
	console.log(result);
	return result;
};

const getAllPurchase = async () => {
	let Purchase = [];
	const result = (await client.get("/allPurchase")).data.result;
	for (let i = 0; i < result.length; i++) {
		if (result[i].history.length > 1 &&result[i].history[1].type == "finished") {
			const item = await client.get(`/item?id=${result[i].item}`);
			const auction = await client.get(`/auction?id=${result[i].auction}`);
			const transaction = await client.get(
				`/transaction-id?id=${result[i].transaction}`,
			);
			const buyer = await client.get(`/user?id=${result[i].buyer}`);
			const seller = await client.get(`/user?id=${result[i].seller}`);
			Purchase.push({
				_id: result[i]._id,
				date: result[i].history[1].time,
				buyer: buyer.data.result,
				seller: seller.data.result,
				item : item.data.result.nama,
				image: item.data.result.images,
				auction: auction.data.result,
				transaction: transaction.data.result.invoice.amount,
			});
		}
	}
	console.log(Purchase);
	return Purchase;
};

const getAllAuction = async () => {
	const result = await client.get("/allAuction");
	// console.log(result)
	return result;
};

const getAuctionByQuery = async (data) => {
	const { params } = data;
	const { query } = params;
	const result = await client.get(`/search?query=${query}`);
	console.log(result.data.result);
	return { data: result.data.result, query: query };
};

const getSampleAuction = async () => {
	// alert('sample called')
	const temp = await client.get("/sampleAuction");
	const allAuctions = temp.data.result;
	console.log(allAuctions);
	for (let i = 0; i < allAuctions.length; i++) {
		try {
			const item_id = allAuctions[i].id_barang;
			const result = await getItem(item_id);
			allAuctions[i].item = result.data.result;
		} catch (error) {
			console.log(error);
		}
	}
	console.log(allAuctions);
	return allAuctions;
};

const getAllAuctionDetail = async () => {
	const temp = await getAllAuction();
	const allAuctions = temp.data.result;
	console.log(allAuctions);
	for (let i = 0; i < allAuctions.length; i++) {
		try {
			const item_id = allAuctions[i].id_barang;
			const result = await getItem(item_id);
			const result2 = await getHighBid(allAuctions[i]._id);
      console.log(result2);
			allAuctions[i].item = result.data.result;
      allAuctions[i].highest_bid = result2.data.result;
		} catch (error) {
			console.log(error);
		}
	}
	return allAuctions;
};

const getHighBid = async (id) => {
	const result = await client.get("/highBid?id=" + id);
  return result;
};

const getItem = async (item_id) => {
	const result = await client.get(`/item?id=${item_id}`);
	// console.log(result);
	return result;
};

const NavBarData = async () => {
	// alert("loader dipanggil")
	try {
		const token = localStorage.getItem("token");
		if (token) {
			const userData = await client.get("/getDataFromToken?token=" + token);
			if (userData.status == 401) {
				alert("Invalid Token");
				return null;
			}
			const user = userData.data.payload.user;
			const wallet = await client.get("/wallet?id=" + user._id);
			const result = {
				nama: user.nama || "User",
				wallet: wallet.data.result.saldo,
				profile_picture: user.profile_picture,
			};
			console.log(result);
			return result;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getWallet = async () => {
	try {
		const token = localStorage.getItem("token");
		const userData = await client.get("/getDataFromToken?token=" + token);
		if (userData.status == 401) {
			alert("Invalid Token");
			return null;
		}

		const user = userData.data.payload.user;
		const wallet = await client.get("/wallet?id=" + user._id);
		const result = {
			user: user || null,
			wallet: wallet.data || null,
		};
		console.log(result);
		return result;
	} catch (error) {
		return null;
	}
};

const getUserById = async (id) => {
	try {
		const user = await client.get("/user?id=" + id);
		return user.data.result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getUserData = async () => {
	try {
		const token = localStorage.getItem("token");
		if (token) {
			const userData = await client.get("/getDataFromToken?token=" + token);
			if (userData.status == 401) {
				alert("Invalid Token");
				return null;
			}
			return userData.data.payload.user;
		} else {
			return {
				nama: "Guest",
			};
		}
	} catch (error) {
		console.log(error);
		alert("Gagal Mendapatkan data user");
		return null;
	}
};

const getAllUser = async () => {
	try {
		const result = await client.get("/allUser");
		return result.data.result;
	} catch (error) {
		console.log(error);
		alert("Gagal Mendapatkan data user");
		return null;
	}
};

export default {
	getAuction,
	getItem,
	getAllAuction,
	getUserData,
	getAuctionData,
	getAllAuctionDetail,
	getSampleAuction,
	getAuctionByQuery,
	NavBarData,
	getWallet,
	getBid,
	getAllPurchaseAsBuyer,
	getAllPurchaseAsSeller,
	getAllUser,
	getPurchaseDetails,
	getAllPurchase,
};
