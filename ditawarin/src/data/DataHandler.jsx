import client from "../client";

const getAuction = async (data) => {
    const {params} = data;
    const {id} = params;
    const token = localStorage.getItem('token');
    const result = await client.get(`/auction?id=${id}`);
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

const getAllAuction = async () => {
    const token = localStorage.getItem('token');
    const result = await client.get("/allAuction");
    console.log(result)
    return(result)
}

const getItem = async (item_id) => {
    const result = await client.get(`/item?id=${item_id}`);
    console.log(result);
    return result;
}

export default {getAuction, getItem, getAllAuction};
