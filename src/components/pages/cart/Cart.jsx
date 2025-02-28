import React, { useContext } from "react";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { ContextCart } from "../../../context/ContextCart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; 
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, RemoveCart, total } = useContext(ContextCart);

 
  const handleRemove = (id, titulo) => {
    removeFromCart(id);
    Swal.fire({
      title: "Artículo eliminado",
      text: `${titulo} ha sido eliminado del carrito.`,
      icon: "warning",
      confirmButtonText: "Aceptar"
    });
  };

  
  const handleEmptyCart = () => {
    if (cart.length === 0) return;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará todos los artículos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar carrito",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        RemoveCart();
        Swal.fire("Carrito vacío", "Se han eliminado todos los productos.", "success");
      }
    });
  };

  
  const handleFinalizePurchase = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "No puedes finalizar la compra sin artículos.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    Swal.fire({
      title: "Casi terminas de realizar tu compra",
      text: "Complete los datos para finalizar su compra",
      icon: "success",
      confirmButtonText: "Aceptar"
    }).then(() => {
      
    });
  };

  return (
    <Card className="cart-container">
      <CardContent>
        <Typography variant="h5" className="cart-title">Carrito de Compras</Typography>

        {cart.length === 0 ? (
          <Typography variant="body1">El carrito está vacío.</Typography>
        ) : (
          <List>
            {cart.map((producto, index) => (
              <ListItem key={index} className="cart-item">
                <ListItemText
                  primary={producto.titulo}
                  secondary={`Precio: ${producto.precio} - Cantidad: ${producto.cantidad}`}
                />
               
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleRemove(producto.id, producto.titulo)} 
                >
                  Quitar
                </Button>
              </ListItem>
            ))}
          </List>
        )}

        {/* Total a pagar */}
        <Typography variant="h6" className="total">
          Total a pagar: ${total.toFixed(2)}
        </Typography>

       
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleEmptyCart} 
          disabled={cart.length === 0}
        >
          Vaciar carrito
        </Button>

        
        <Link to="/checkout" style={{ textDecoration: 'none' }}>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleFinalizePurchase} 
          disabled={cart.length === 0}
        >
          Finalizar compra
        </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Cart;
