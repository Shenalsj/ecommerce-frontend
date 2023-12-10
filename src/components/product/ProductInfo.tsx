import React from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { addToCart } from "../../features/cart/cartSlice";
import { Product } from "../../types/productTypes";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  //common JSX
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
