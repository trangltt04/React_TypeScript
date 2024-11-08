import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartItem } from "../interface/Cart";
import { Product } from "../interface/Product";
import { AuthContext } from "../contexts/AuthContext";
import "./Home.scss";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { state } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  ); // Trạng thái để sắp xếp
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Chức năng xử lý việc thêm sản phẩm vào giỏ hàng
  const addToCart = (product: Product) => {
    const index = cart.findIndex(
      (item: CartItem) => item.product.id === product.id
    );
    if (index === -1) {
      // Nếu sản phẩm không có trong giỏ hàng, hãy thêm nó với số lượng 1
      cart.push({ product, quantity: 1 });
    } else {
      // Nếu đã tồn tại, hãy tăng số lượng
      cart[index].quantity++;
    }
    // Lưu giỏ hàng vào local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Add to cart successfully");
  };

  // Chức năng xử lý sắp xếp
  const handleSortChange = (order: "asc" | "desc" | "default") => {
    setSortOrder(order);
  };

  // Chức năng xử lý truy vấn tìm kiếm
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Chức năng lọc sản phẩm dựa trên truy vấn tìm kiếm
  const filteredProducts = () => {
    return state.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Chức năng sắp xếp sản phẩm dựa trên sortOrder
  const sortedAndFilteredProducts = () => {
    const products = filteredProducts();
    if (sortOrder === "default") return products; // Thứ tự mặc định
    return products.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price; // Sắp xếp theo giá tăng dần
      } else {
        return b.price - a.price; // Sắp xếp theo giá giảm dần
      }
    });
  };

  return (
    <div className="home-container">
      <div className="controls-container">
        <SearchBar onSearch={handleSearch} /> {/* Tích hợp thanh tìm kiếm*/}
        <div className="sort-container">
          <label htmlFor="sort">Sort by price: </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) =>
              handleSortChange(e.target.value as "asc" | "desc" | "default")
            }
          >
            <option value="default">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-list row">
        {sortedAndFilteredProducts().map((item) => (
          <div key={item.id} className="product-item col-12 col-md-6 col-lg-4">
            <img src={item.thumbnail} alt={item.title} />

            <Link to={`/product-detail/${item.id}`} className="product-title">
              <h1>{item.title}</h1>
            </Link>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={
                user?.email
                  ? () => addToCart(item)
                  : () => {
                      alert("Bạn phải đăng nhập để thực hiện tính năng này!");
                    }
              }
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
