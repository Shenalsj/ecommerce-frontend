import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";

import { postNewProduct } from "../../app/api";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchCategories } from "../../features/category/categorySlice";

const AddProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e: any) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    setLoading(true);
    postNewProduct({
      name: productData.name,
      price: Number(productData.price),
      description: productData.description,
      categoryId: productData.categoryId,
      image: productData.image,
    })
      .then((res) => {
        toast.success("Product Created Successfully");
        setProductData({
          name: "",
          price: "",
          description: "",
          categoryId: "",
          image: "",
        });
      })
      .catch((err) => {
        toast.error("Error Creating Product");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box maxWidth={500} mx={"auto"}>
      <Box my={4}>
        <Typography textAlign={"center"} fontSize={30}>
          New Product
        </Typography>
        <TextField
          placeholder="Enter Product Title"
          label="Title"
          fullWidth
          sx={{ my: 1 }}
          value={productData.name}
          onChange={handleInputChange}
          name="name"
        />
        <TextField
          placeholder="Enter Product Price"
          label="Price"
          fullWidth
          type="number"
          sx={{ my: 1 }}
          value={productData.price}
          onChange={handleInputChange}
          name="price"
        />
        <TextField
          placeholder="Enter Product Description"
          label="Description"
          fullWidth
          sx={{ my: 1 }}
          value={productData.description}
          onChange={handleInputChange}
          name="description"
        />

        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            value={productData.categoryId}
            label="category"
            onChange={handleInputChange}
            fullWidth
            placeholder="Select Category"
            name="categoryId"
            id="category"
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          placeholder="Enter Product Image Url"
          label="Image Url"
          fullWidth
          sx={{ my: 1 }}
          value={productData.image}
          onChange={handleInputChange}
          name="image"
        />
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
          style={{ backgroundColor: "#002b6b", color: "white" }}
        >
          Create Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
