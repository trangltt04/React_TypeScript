import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.scss";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user || user?.role !== "admin") {
    return <h1>Bạn không có quyền vào trang này!</h1>;
  }
  return (
    <div className="admin-layout">
      <h1 className="admin-header">Hello Admin</h1>
      <div className="admin-main">
        <div className="sidebar">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/products">Products</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/categories">Categories</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
