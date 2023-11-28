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

export default {getAuction, getItem, getAllAuction, getUserData};
