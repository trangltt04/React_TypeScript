import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { getDetail, state } = useContext(ProductContext);

  if (id) {
    useEffect(() => {
      getDetail(id);
    }, [id]);
  }
  return (
    <div className="product-detail-container">
      <h1 className="product-detail-title">Chi tiết sản phẩm</h1>
      {state.selectedProduct && (
        <div>
          <img src={state.selectedProduct.thumbnail} />

          <h2 className="product-detail-title">
            {state.selectedProduct.title}
          </h2>
          <p className="product-detail-price">
            ${state.selectedProduct.price.toFixed(2)}
          </p>
          <button className="add-to-cart-button">Add to cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
