import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/movieC/MovieContext";
import { useEffect } from "react";
import { deleteMovie, fetchMovies } from "../../context/movieC/apiCalls";

export default function ProductList() {
  const {movies,dispatch}= useContext(MovieContext)

  const handleDelete = (id) => {
    deleteMovie(id, dispatch)
  };

  useEffect(() => {
    fetchMovies(dispatch);
  }, [dispatch])

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Age Limit", width: 120 },
    { field: "isSeries", headerName: "IsSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id} 
              state={{movie:params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r)=>r._id}
      />
    </div>
  );
}
