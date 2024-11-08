import { createContext, ReactNode, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { Product } from "../interface/Product";
import productReducer from "../reducers/productReducer";

type ProductContextType = {
  state: {
    products: Product[];
    selectedProduct?: Product;
  };
  onRemove: (id: number) => void;
  onSubmit: (data: Product) => void;
  getDetail: (data: number | string) => void;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products`);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);

  const onRemove = async (id: number) => {
    if (confirm("Are you sure?")) {
      await api.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
  };

  const onSubmit = async (data: Product) => {
    try {
      if (data.id) {
        await api.patch(`/products/${data.id}`, data);
        dispatch({ type: "UPDATE_PRODUCT", payload: data });
      } else {
        await api.post("/products", data);
        dispatch({ type: "ADD_PRODUCT", payload: data });
      }
      nav("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const getDetail = async (id: number | string | undefined) => {
    const { data } = await api.get(`/products/${id}`);
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: data });
  };

  return (
    <ProductContext.Provider value={{ state, onRemove, onSubmit, getDetail }}>
      {children}
    </ProductContext.Provider>
  );
};
