import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "../types/types";

type CartContextType = {
  cartItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
