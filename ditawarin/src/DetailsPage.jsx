import { useLoaderData } from "react-router"
export default function DetailsPage(){
    
    const data = useLoaderData();
    const purchase_data = data.data.result.purchase;
    const item_data = data.data.result.item;
    const auction_data = data.data.result.auction;
    const buyer_data = data.data.result.buyer;
    const seller_data = data.data.result.seller;
    console.log(purchase_data)
    console.log(item_data)
    console.log(auction_data)
    console.log(buyer_data)
    console.log(seller_data)

    return (
        <>
            <h1>Purchase Details Page</h1>
        </>
    )
}