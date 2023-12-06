import { redirect } from "react-router-dom";
import client from "../client";

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
    let highest_bid = null;
    if(auction.auctiondata.highest_bid){
        highest_bid = await getBid(auction.auctiondata.highest_bid);
    }

    const result = {
        auctiondata: auction.auctiondata,
        itemdata: auction.itemdata,
        userdata: user,
    }

    if(highest_bid){
        result.highest_bid = highest_bid.data.result;
    }

    return result;
}

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
  for (let i = 0; i < allAuctions.length; i++) {
    try {
      const item_id = allAuctions[i].id_barang;
      const result = await getItem(item_id);
      allAuctions[i].item = result.data.result;
    } catch (error) {
      console.log(error);
    }
  }
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
      allAuctions[i].item = result.data.result;
    } catch (error) {
      console.log(error);
    }
  }
  return allAuctions;
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
};
