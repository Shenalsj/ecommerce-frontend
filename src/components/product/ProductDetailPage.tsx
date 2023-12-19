//ProductDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { Product } from "../../types/productTypes";
import ProductInfo from "./ProductInfo";
import "../../styles/ProductDetailPage.scss";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>(); 
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    if (productId && products.hasOwnProperty(productId)) {
      setProduct(products[productId]);
    }
  }, [productId, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} className="product-detail-container">
      <Grid item xs={12} sm={6} md={6}>
        <img src={product.image} alt="" className="product-image" />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box mt={2}>
          <ProductInfo product={product} />
        </Box>
        <Link to="/cart" className="home-link">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#002b6b",
              marginTop: "10px",
              marginLeft: "0",
              marginRight: "10px",
            }}
          >
            Buy Now
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;
