import client from "../client";

const getItem = async (data) => {
    const {params} = data;
    const {id} = params;
    const token = localStorage.getItem('token');
    const result = await client.get(`/item?id=${id}&token=${token}`);
    return result;
}

export default {getItem};