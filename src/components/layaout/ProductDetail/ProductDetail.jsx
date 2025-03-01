import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { ContextCart } from "../../../context/ContextCart";
import Swal from "sweetalert2";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const ProductDetail = () => {
    const { addToCart } = useContext(ContextCart);
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1); // Inicializa la cantidad en 1
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "productosData", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No se encontró el producto");
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) return <Typography variant="h5">Cargando...</Typography>;
    if (!producto) return <Typography variant="h5">Producto no encontrado</Typography>;

    const stockDisponible = parseInt(producto.stock, 10);

    const aumentarCantidad = () => {
        if (cantidad < stockDisponible) setCantidad(cantidad + 1); // Incrementa cantidad hasta el stock disponible
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) setCantidad(cantidad - 1); // resta la cantidad hasta 1
    };

    const agregarAlCarrito = () => {
        if (cantidad > 0) {
            const productoConCantidad = { ...producto, cantidad };
            addToCart(productoConCantidad);

            Swal.fire({
                title: "¡Agregado al carrito!",
                text: `${producto.titulo} x ${cantidad} unidades`,
                icon: "success",
                confirmButtonText: "Aceptar"
            });
        }
    };

    return (
        <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
            <CardMedia
                component="img"
                height="400"
                image={producto.imagen}
                alt={producto.titulo}
                sx={{ objectFit: "contain" }}
            />
             <CardContent>
                <Typography variant="h4" gutterBottom>{producto.titulo}</Typography>
                <Typography variant="body1" color="text.secondary">{producto.descripcion}</Typography>
                <Typography variant="h5" color="primary" sx={{ mt: 2 }}>${producto.precio}</Typography>
                <Typography variant="body2" color="text.secondary">Stock disponible: {stockDisponible}</Typography>

                {/* Aquí agregamos la categoría */}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Categoría: {producto.categoria}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                    <Button variant="contained" color="secondary" onClick={disminuirCantidad} disabled={cantidad === 1}>-</Button>
                    <Typography variant="h6">{cantidad}</Typography>
                    <Button variant="contained" color="secondary" onClick={aumentarCantidad} disabled={cantidad >= stockDisponible}>+</Button>
                </Box>

                <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, width: "100%" }}
                    onClick={agregarAlCarrito}
                    disabled={cantidad === 0}
                >
                    Agregar al carrito
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductDetail;
