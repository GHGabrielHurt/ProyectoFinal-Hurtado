import React, { useContext, useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import Swal from "sweetalert2"; 
import { ContextCart } from "../../../context/ContextCart";
import { db } from "../../../firebaseconfig";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";

export const Checkout = () => {
  const { cart, total, RemoveCart } = useContext(ContextCart);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: ""
  });

  const [isPurchased, setIsPurchased] = useState(false); 

  // Manejo de cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para actualizar el stock de los productos comprados
  const updateStock = async () => {
    for (const item of cart) {
      const productRef = doc(db, "productosData", item.id);
      try {
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock;
          const newStock = currentStock - item.cantidad;

          if (newStock >= 0) {
            await updateDoc(productRef, { stock: newStock });
            console.log(`Stock actualizado para ${item.id}: ${newStock}`);
          } else {
            console.warn(`Stock insuficiente para ${item.id}`);
          }
        } else {
          console.warn(`Producto ${item.id} no encontrado en la base de datos`);
        }
      } catch (error) {
        console.error(`Error actualizando stock de ${item.id}:`, error);
      }
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let order = {
      buyer: formData,
      items: cart,
      total: total
    };

    try {
      let ordersCollection = collection(db, "orders");
      const orderRef = await addDoc(ordersCollection, order);

      
      Swal.fire({
        title: "Compra realizada 🎉",
        text: `Tu número de compra es: ${orderRef.id}`,
        icon: "success",
        confirmButtonText: "Aceptar"
      });

     
      setIsPurchased(true);

      RemoveCart();

      // Actualizar stock después de confirmar la compra
      await updateStock();
    } catch (error) {
      console.error("Error procesando la compra:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar la compra.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Formulario de Checkout
      </Typography>

     
      {!isPurchased && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Teléfono */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                variant="outlined"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Botón de enviar */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Comprar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default Checkout;
