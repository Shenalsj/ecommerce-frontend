//ProductInfo.tsx
import React from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { addToCart } from "../../features/cart/cartSlice";
import { Product } from "../../types/productTypes";
import Rating from "../Rating";

interface ProductInfoProps {
  product: Product | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId: string | undefined) => {
    if (productId) {
      dispatch(addToCart(productId));
    }
  };

  return (
    <>
      <Typography
        fontSize={25}
        fontWeight={"bold"}
        gutterBottom
        style={{ textAlign: "left" }}
      >
        {product?.name}
      </Typography>

      <Typography fontSize={20} gutterBottom style={{ textAlign: "left" }}>
        Description: {product?.description}
      </Typography>
      <Rating rating={product?.rating || 0} />
      <Typography gutterBottom fontSize={18} style={{ textAlign: "left" }}>
        Price: ${product?.price}
      </Typography>
      <Button
        variant="contained"
        onClick={() => handleAddToCart(product?._id)}
        style={{
          backgroundColor: "#002b6b",
          marginTop: "10px",
          marginLeft: "0",
          marginRight: "10px",
        }}
        startIcon={<ShoppingCartIcon />}
      >
        Add to cart
      </Button>
    </>
  );
};
ProductInfo.defaultProps = {
  product: null,
};

export default ProductInfo;
