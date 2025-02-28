import React from "react";
import { Navbar } from "./components/layaout/navbar/Navbar";
import { Footer } from "./components/layaout/footer/Footer";
import { ItemListContainer } from "./components/pages/ItemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/layaout/ProductDetail/ProductDetail";
import Cart from "./components/pages/cart/Cart";
import { ContextCart, ContextCartProvider } from "./context/ContextCart";
//import Checkout from "./components/pages/checkout/Checkout";
import Checkout from "./components/pages/checkout/Checkout";
import "./App.css";

const App = () => {
  return (
    <div>
    <BrowserRouter>
     <ContextCartProvider>
     <Navbar />
     <Routes>
     <Route path="/" element={<ItemListContainer />}/>
     <Route path="/Category/:name" element={<ItemListContainer />}/>
     <Route path="/ProductDetail/:id" element={<ProductDetail />}/>
     <Route path="/Cart" element={<Cart />}/>
     <Route path="/Checkout" element={<Checkout />}/>
     <Route path="*" element={<h1> Error 404 not found</h1>}/>
     </Routes>
     <Footer />
     </ContextCartProvider>
     </BrowserRouter>
     
  </div>
  )
  
};

export default App;
