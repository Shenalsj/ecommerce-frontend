import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { addToCart } from "../../features/cart/cartSlice";
import { Product } from "../../types/productTypes";
import { deleteProduct } from "../../app/api";

interface ProductDetailCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (productId: string) => {
    dispatch(addToCart(productId));
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId).then((res) => {
      toast.success("Product Deleted Successfully");
      window.location.reload();
    });
  };

  return (
    <Grid container spacing={1} className="grid-cls">
      <Card className="card-cls">
        <CardMedia
          component="img"
          alt={product.imageAlt}
          height="140"
          image={product.image}
          className="card-media-cls"
        />
        <CardContent className="card-content-cls">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="card-title-cls"
          >
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.primary">
            ${product.price}
          </Typography>
          <Box display="flex">
            <Link to={`/admin/update/${product._id}`}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#002b6b", color: "white" }}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => handleDelete(product._id)}
              variant="contained"
              style={{ backgroundColor: "#002b6b", color: "white" }}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
