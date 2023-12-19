//AddCategory.tsx
import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

import axios from "axios";

const AddCategory: React.FC = () => {
  const [categoryData, setCategoryData] = React.useState({
    name: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e: any) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/categories`, categoryData)
      .then((res) => {
        toast.success("Category Created Successfully");
        setCategoryData({
          name: "",
        });
      })
      .catch((err) => {
        toast.error("Error Creating Category");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box maxWidth={500} mx={"auto"}>
      <Box my={4}>
        <Typography textAlign={"center"} fontSize={30}>
          New Category
        </Typography>
        <TextField
          placeholder="Enter Category Name"
          label="Name"
          fullWidth
          sx={{ my: 1 }}
          value={categoryData.name}
          onChange={handleInputChange}
          name="name"
        />

        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
          style={{ backgroundColor: "#002b6b", color: "white" }}
        >
          Create Category
        </Button>
      </Box>
    </Box>
  );
};

export default AddCategory;

