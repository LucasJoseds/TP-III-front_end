import { Cardapio } from '@/app/interface/Cardapio';
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface CartContextType {
  cartItems: Cardapio[];
  addToCart: (item: Cardapio) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Cardapio[]>([]);

  const addToCart = (item: Cardapio) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};