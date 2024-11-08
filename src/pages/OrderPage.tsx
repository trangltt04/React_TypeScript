// const Order = () => {
//   const bill = JSON.parse(localStorage.getItem("bill") || "{}");
//   console.log(bill);
//   return <div></div>;
// };

// export default Order;

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./OrderPage.scss";

const OrderPage = () => {
  // Lấy thông tin đơn hàng từ localStorage
  const order = JSON.parse(localStorage.getItem("bill") || "{}");
  const { user } = useContext(AuthContext);

  // Trích xuất thông tin chi tiết về người dùng và đơn hàng
  const { cart, totalPrice } = order;

  return (
    <div className="order-container">
      <h1 className="order-header">Thông Tin Đơn Hàng</h1>

      {/* Thông tin người mua*/}
      <div className="buyer-info">
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
      </div>

      {/* Chi tiết đơn hàng */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.length > 0 ? (
            cart.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.product.title}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price * item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="empty-order-message">
                Không có sản phẩm trong đơn hàng.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Tổng giá */}
      <h3 className="total-price">Tổng Tiền: {totalPrice || 0}$</h3>
    </div>
  );
};

export default OrderPage;
