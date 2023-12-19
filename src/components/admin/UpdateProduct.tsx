//UpdateProduct.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

import { useAppSelector } from "../../app/hooks";
import { updateProduct } from "../../app/api";

const UpdateProduct: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
  });

  const { productId } = useParams<{ productId: string }>();

  const navigate = useNavigate();

  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    if (productId) {
      const p = products[productId];
      setProduct({
        name: p.name,
        price: p.price,
      });
    }
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    setLoading(true);
    if (productId) {
      updateProduct({
        _id: productId,
        name: product.name,
        price: product.price,
      })
        .then((res) => {
          toast.success("Product Updated Successfully");
          navigate("/admin");
        })
        .catch((err) => {
          toast.error("Error Updating Product");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box maxWidth={500} mx={"auto"}>
      <Box my={4}>
        <Typography textAlign={"center"} fontSize={30}>
          Update Product
        </Typography>
        <TextField
          placeholder="Enter Product Title"
          label="Title"
          fullWidth
          sx={{ my: 1 }}
          value={product?.name}
          onChange={handleInputChange}
          name="name"
        />
        <TextField
          placeholder="Enter Product Price"
          label="Price"
          fullWidth
          type="number"
          sx={{ my: 1 }}
          value={product?.price}
          onChange={handleInputChange}
          name="price"
        />
        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          Update Product
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
