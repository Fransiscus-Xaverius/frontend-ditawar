import { useLoaderData } from "react-router-dom";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";

export default function SearchPage(props) {
  const loader_data = useLoaderData();
  const result = loader_data.data;
  const query = loader_data.query;
  const [kategori, setKategori] = useState([])
  const [hasil, setHasil] = useState([])

  const filter = [
    "Rumah Tangga",
    "Elektronik",
    "Buku",
    "Dapur",
    "Fashion",
    "Perhiasan",
    "Logam Mulia",
    "Mainan dan Hobi",
    "Peralatan Olahraga",
    "Otomotif",
    "Properti",
  ];

  function filtering(filter){
    let has = [];
    if (kategori.length == 0) {
      has.push(filter)
    }else{
      let kembar = false
      for (let i = 0; i < kategori.length; i++) {
        if (kategori[i] != filter) {
          has.push(kategori[i])
        }else{
          kembar = true
        }
      }
      if (kembar == false) {
        has.push(filter)
      }
    }
    setKategori(has)
  }

  useEffect(() => {
    let has = []
    if (kategori.length == 0) {
      has = result
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].auction.kategori_barang.includes(kategori[0])) {
        has.push(result[i])
      }
    }
    for (let i = 0; i < has.length; i++) {
      for (let j = 1; j < kategori.length; j++) {
        if (!has[i].auction.kategori_barang.includes(kategori[j])) {
          console.log("k")
          has.splice(i, 1)
        }
      }
    }
    setHasil(has)
  }, [kategori]);

  return (
    <div className="container">
      <div className="text-center pt-4">
        <h1>Search Result for "{query}"</h1>
      </div>
      <div className="row mt-5">
        <div className="col-sm-2">
          <div className="p-3">
            <div className="d-flex align-items-center mb-2">
              <h4 className="mb-0">Filter</h4>
              <button className="btn text-white p-1 ms-auto" style={{ width: "70px" , backgroundColor: "#06083D", textTransform: "uppercase", borderRadius: "10px"}}> RESET </button>
            </div>
            
            <ul className="list-unstyled">
              {filter.map((i) => {
                return (
                  <li key={i} className="border-bottom py-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={i}
                        id={i}
                        onChange={() => filtering(i.toLowerCase())}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        htmlFor={i}
                      >
                        {i}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-4">
          <div className="container-fluid d-flex flex-column">
            <div className="row d-flex flex-column">
              <div className="col-4">
                {hasil.map((item, index) => {
                  return <SearchItem {...item} key={item._id} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
