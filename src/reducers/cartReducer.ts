import { Cart } from "../interface/Cart";
import { Product } from "../interface/Product";

type State = {
  products: Product[];
};

type Action =
  | { type: "ADD_TO_CART"; payload: Cart }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_CART"; payload: Cart[] };

const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, products: [...state.products, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
