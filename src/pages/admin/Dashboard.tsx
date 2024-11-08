import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import "./Dashboard.scss";

const Dashboard = () => {
  const { state, onRemove } = useContext(ProductContext);
  return (
    <div className="dashboard">
      <Link
        to="/admin/product-add"
        className="btn btn-outline-success add-button"
      >
        Add New Product
      </Link>
      <table className="table table-bordered product-table">
        <thead className="table-danger">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="product-thumbnail"
                />
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemove(Number(item.id))}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/product-edit/${item.id}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
