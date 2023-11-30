import client from "../client";

const getAuction = async (data) => {
    const {params} = data;
    const {id} = params;
    const token = localStorage.getItem('token');
    const result = await client.get(`/auction?id=${id}`);
    console.log(result.data);
    const item_id = result.data.result.id_barang;
    console.log(item_id);
    const result2 = await getItem(item_id);
    console.log(result2);
    
    const auction = {
        auctiondata: result.data.result,
        itemdata: result2.data.result
    }
    return auction;
}

const getAuctionData = async (data) => {
    const auction = await getAuction(data);
    const user = await getUserData();

    const result = {
        auctiondata: auction.auctiondata,
        itemdata: auction.itemdata,
        userdata: user
    }
    return result;
}

const getAllAuction = async () => {
    const result = await client.get("/allAuction");
    // console.log(result)
    return(result)
}

const getAuctionByQuery = async (data) => {
    const {params} = data;
    const {query} = params;
    const result = await client.get(`/search?query=${query}`);
    console.log(result)
    return(result)
}

const getSampleAuction = async () => {
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
}

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
}

const getItem = async (item_id) => {
    const result = await client.get(`/item?id=${item_id}`);
    // console.log(result);
    return result;
}

const getUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        const userData = await client.get('/getDataFromToken?token='+token);
        if(userData.status == 401){
            alert("Invalid Token")
            return null;
        }
        return userData.data.payload.user;
    } catch (error) {
        console.log(error);
        alert("Gagal Mendapatkan data user");
        return null;
    }
}

export default {getAuction, getItem, getAllAuction, getUserData, getAuctionData, getAllAuctionDetail, getSampleAuction, getAuctionByQuery};
