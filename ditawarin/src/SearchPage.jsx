import { useLoaderData } from "react-router-dom";
import SearchItem from "./SearchItem";

export default function SearchPage(props){
    const loader_data = useLoaderData();
    const result = loader_data.data;
    const query = loader_data.query;
    return(
        <>
            <h1>Search Result for "{query}"</h1>
            <div className="container-fluid d-flex flex-column">
                <div className="row d-flex flex-column">
                    <div className="col-4">
                        {result.map((item, index) => {
                            return (
                                <SearchItem {...item} key={item._id}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )

}