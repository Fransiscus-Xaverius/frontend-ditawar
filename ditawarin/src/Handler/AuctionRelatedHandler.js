import client from "../client";

export async function buyNowHandler(id) {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = {
        'Authorization': 'Bearer your_token',
        'Content-Type': 'application/json',
        'token': token
    }
    let url = `/buy-now?id=${id}`;
    await client.post(url, {}, {
        headers
    });
}