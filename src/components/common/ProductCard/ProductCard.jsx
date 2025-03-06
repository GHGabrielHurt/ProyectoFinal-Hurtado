import React from "react";
import { Button } from "@mui/material";
import './ProductCard.css';
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  return (
      <div className="item">
          {props.imagen && (
              <img 
                  src={props.imagen} 
                  alt={props.titulo} 
                  className="item-image" 
              />
          )}
          <h2 className="title">{props.titulo}</h2>
          <p>{props.descripcion}</p>
          <h2 className="item-price">{props.precio}</h2>
          <Link to={`/ProductDetail/${props.id}`}> 
              <Button 
                  variant="contained" 
                  color="primary" 
              >
                  Ver Detalle
              </Button>
          </Link>
      </div>
  );
};

