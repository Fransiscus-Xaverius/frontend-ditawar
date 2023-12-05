import { useLoaderData } from "react-router-dom";
import SearchItem from "./SearchItem";

export default function SearchPage(props) {
  const loader_data = useLoaderData();
  const result = loader_data.data;
  const query = loader_data.query;

  const filter = [
    "mobil",
    "tanah",
    "pabrik",
    "ruko",
    "rumah",
    "apart",
    "villa",
    "elektronik",
    "motor",
    "gudang",
    "lainnya",
  ];

  return (
    <div className="container">
      <div className="text-center pt-4">
        <h1>Search Result for "{query}"</h1>
      </div>
      <div className="row mt-5">
        <div className="col-sm-2">
          <div className="p-3">
            <h4>Filter</h4>
            <ul className="list-unstyled">
              {filter.map((i) => {
                return (
                  <li key={i} className="border-bottom py-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={i}
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
                {result.map((item, index) => {
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
