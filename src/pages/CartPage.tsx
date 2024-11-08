import { useContext, useEffect, useState } from "react";
import { CartItem } from "../interface/Cart";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.scss";

const CartPage = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showQRCode, setShowQRCode] = useState(true);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((acc: number, item: CartItem) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      setTotalPrice(Math.round(total * 100) / 100);
    }
  }, []);

  const handlePayment = () => {
    const bill = { user, cart, totalPrice };
    localStorage.setItem("bill", JSON.stringify(bill));
    localStorage.removeItem("cart");
    setShowQRCode(false);
    alert("Thanh toan thanh cong!");
    nav("/order");
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Gio hang</h1>
      </div>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Ten san pham</th>
            <th>Gia</th>
            <th>So luong</th>
            <th>Thanh tien</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item: CartItem, index: number) => (
              <tr key={index}>
                <td>{item.product.title}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price * item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="empty-cart-message">Gio hang trong!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3 className="total-price">Thanh tien: {totalPrice || ""}</h3>
      <div className="payment-button-container">
        <button onClick={() => handlePayment()} className="btn btn-danger">
          Thanh toan
        </button>
        {showQRCode && (
          <img
            src="qr.png"
            alt="QR Code for payment"
            className={`qr-code ${!showQRCode ? "qr-code-hidden" : ""}`}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
