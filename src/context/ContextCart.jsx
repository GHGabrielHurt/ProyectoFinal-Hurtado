import { createContext, useState } from "react";

export const ContextCart = createContext();

export const ContextCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Inicializado como array vacío

  // Función para agregar al carrito
  const addToCart = (producto) => {
    setCart((prevCart) => {
      // Verificar si el producto ya está en el carrito
      const existingProduct = prevCart.find((item) => item.id === producto.id);

      if (existingProduct) {
        
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad } // Aumentamos la cantidad del producto
            : item
        );
      } else {
        // Si no está, lo agregamos con la cantidad proporcionada
        return [...prevCart, { ...producto, cantidad: producto.cantidad }];
      }
    });
    
  };

  // Función para limpiar el carrito
  const RemoveCart = () => {
    setCart([]);
    
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((producto) => producto.id !== id));
    
  };

  // Calcular el total a pagar (ahora precio es un número)
  const total = cart.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad, 0
  );

  // Calcular el total de items (cantidad total de productos)
  const totalItems = cart.reduce((acc, producto) => acc + producto.cantidad, 0);

  const data = { cart, addToCart, RemoveCart, removeFromCart, total, totalItems };

  return <ContextCart.Provider value={data}>{children}</ContextCart.Provider>;
};
