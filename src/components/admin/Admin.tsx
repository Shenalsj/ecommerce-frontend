import React, { useEffect } from "react";
import { Box, Typography, Pagination, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { receivedProducts } from "../../features/product/productSlice";
import { getProducts } from "../../app/api";
import { ProductCard } from "./ProductCard";

const Admin: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products));
    });
  }, []);

  //   Pagination Logic
  const productsPerPage = 12;
  const totalProducts = Object.values(products).length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const filteredProducts = Object.values(products).slice(startIndex, endIndex);

  return (
    <Box>
      <Box display={"flex"} my={3} mx={2}>
        <Link to="/admin/add-product">
          <Button
            variant="contained"
            style={{ backgroundColor: "#002b6b", color: "white" }}
          >
            {" "}
            Add New Product
          </Button>
        </Link>
      </Box>
      <Typography textAlign={"center"} variant="h1" fontSize={35} my={3}>
        Admin Products
      </Typography>
      <div className="product-list">
        {filteredProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
    </Box>
  );
};

export default Admin;
