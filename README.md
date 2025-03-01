# React + Vite
# Proyecto de Comercio Electrónico

Este proyecto es una aplicación de comercio electrónico que permite a los usuarios visualizar productos, agregarlos al carrito de compras y proceder al proceso de pago.

## Características

- **Vista de Productos**: Los usuarios pueden ver los productos disponibles con su título, imagen, descripción y precio.
- **Carrito de Compras**: Los productos seleccionados se agregan al carrito, donde los usuarios pueden ver los detalles del producto y el total. Ademas pueden quitar un porducto o vacir el carrito.
- **Checkout**: Los usuarios pueden llenar un formulario con su información personal (nombre, teléfono, correo electrónico) para completar su compra el cual le devolvera un ticket de compra que referncia al dato ingresado a la bases de datos.
- **Gestión de Stock**: Cuando un producto es comprado, se actualiza el stock disponible.
- **Notificaciones**: Utiliza SweetAlert2 para mostrar alertas cuando se agregan productos al carrito, se eliminan o se vacía el carrito.

## Tecnologías Utilizadas

- **React**: Para la creación de la interfaz de usuario y componentes dinámicos.
- **Firebase Firestore**: Para almacenar los datos del producto, las órdenes de compra y la gestión del inventario.
- **Material-UI**: Para los componentes de diseño como botones, formularios y tarjetas.
- **SweetAlert2**: Para mostrar alertas interactivas al usuario.


