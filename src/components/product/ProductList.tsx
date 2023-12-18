import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  receivedProducts,
  setSearchResults,
  sortByPrice,
} from "../../features/product/productSlice";
import { getProducts } from "../../app/api";
import ProductDetailCard from "./ProductDetailCard";
import "../../styles/ProductList.scss";

import { Pagination, Box, Button, Typography } from "@mui/material";

interface ProductListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductList: React.FC<ProductListProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products));
      dispatch(setSearchResults(products));
    });
  }, [dispatch]);

  const products = useAppSelector((state) => state.product.products);
  const searchResults = useAppSelector((state) => state.product.searchResults);

  const productsPerPage = 12;
  const totalProducts = Object.values(products).length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const displayedProducts = searchResults.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Box m={1}>
        <Typography fontWeight={"bold"} fontSize={18}>
          Filter by price
        </Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(sortByPrice("asc"))}
          sx={{ mr: 1 }}
          style={{ backgroundColor: "#002b6b", color: "white" }}
        >
          sort in asc
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(sortByPrice("desc"))}
          style={{ backgroundColor: "#002b6b", color: "white" }}
        >
          sort in desc
        </Button>
      </Box>
      <div className="product-list">
        {displayedProducts.map((product) => (
          <ProductDetailCard key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          className="pagination-cls"
        />
      </div>
    </div>
  );
};

export default ProductList;

