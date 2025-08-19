import { createContext, useContext, useReducer } from "react";

const CartCtx = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const { product, qty = 1 } = action;
      const exists = state.items.find(i => i.id === product.id);
      return exists
        ? { ...state, items: state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i) }
        : { ...state, items: [...state.items, { ...product, qty }] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const add = (product, qty = 1) => dispatch({ type: "add", product, qty });
  return (
    <CartCtx.Provider value={{ cart: state, add }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
