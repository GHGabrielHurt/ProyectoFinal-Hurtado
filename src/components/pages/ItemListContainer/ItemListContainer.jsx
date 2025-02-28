import React, { useEffect, useState } from 'react';
import './ItemListContainer.css';
import { ProductCard } from '../../common/ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebaseconfig';
import {collection, addDoc, getDocs} from "firebase/firestore";


export const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams(); // Obtenemos el valor de la URL
  useEffect(() => {
    setLoading(true); // Mostrar carga al cambiar de categoría
  
    let productsCollections = collection(db, "productosData");
    getDocs(productsCollections)
      .then(res => {
        const array = res.docs.map(elemento => ({
          id: elemento.id,
          ...elemento.data(),
        }));
  
       
        // Filtrar correctamente por categoría
        const productosFiltrados = name
          ? array.filter(producto => 
              producto.categoria?.trim().toLowerCase() === name.trim().toLowerCase()
            )
          : array;
  
        setProductos(productosFiltrados);
      })
      .catch(error => console.log("Error al obtener productos:", error))
      .finally(() => setLoading(false));
  
  }, [name]); 
  

  const handleButtonClick = async () => {
    try {
      let productsCollections = collection(db, "productos"); 
  
      for (const elemento of productosData) {
        const docRef = await addDoc(productsCollections, elemento);
        console.log("Producto agregado con ID:", docRef.id);
      }
  
      alert("Productos agregados correctamente a Firestore!");
    } catch (error) {
      console.error("Error al agregar productos:", error);
      alert("Error al cargar productos");
    }
  };
  
  return (
    <div className='item-list-container'>
      {loading ? (
        <h2>Cargando productos...</h2>
      ) : (
        <div className='items'>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <ProductCard 
                key={producto.id}
                id={producto.id}
                titulo={producto.titulo}
                imagen={producto.imagen}
                precio={producto.precio}
                descripcion={producto.descripcion}
              />
            ))
          ) : (
            <h2>No hay productos en esta categoría</h2>
          )}
        </div>
      )}

      
    </div>
  );
};