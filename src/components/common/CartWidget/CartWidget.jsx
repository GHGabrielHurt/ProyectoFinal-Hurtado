import React from 'react';
import './CartWidget.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextCart } from '../../../context/ContextCart';
import Cart from '../../pages/cart/Cart';

export const CartWidget = ({ itemCount }) => {
  const {totalItems} = useContext(ContextCart);
  console.log(totalItems);
  return (
    <div className="cart-widget">
      <div className="cart-icon-container">
        <span className="cart-icon">🛒</span>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>
    </div>
  );
};

