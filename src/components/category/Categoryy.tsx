//Categoryy.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, Button } from "@mui/material";

import { RootState, AppDispatch } from "../../app/store";
import { fetchCategories } from "../../features/category/categorySlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setSearchResults } from "../../features/product/productSlice";
import "../../styles/Category.scss";
import CategoryProducts from "./CategoryProducts";

interface CategoryProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Category: React.FC<CategoryProps> = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);

  const products = useAppSelector((state) => state.product.products);
  const appDispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    const productsPerPage = 12;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    if (selectedCategory !== null) {
      const filteredArr = Object.values(products)
        .filter((product) => product.categoryId == selectedCategory)
        .slice(startIndex, endIndex);
      appDispatch(setSearchResults(filteredArr));
    }
  }, [selectedCategory, currentPage, handleCategoryClick]);

  const setAllProducts = () => {
    setSelectedCategory(null);
    appDispatch(setSearchResults(Object.values(products)));
  };

  return (
    <div>
      <h2 className="category-heading">Select a Category</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <div className="button-container">
            <Select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value as string)}
              className="category-select"
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>

            <Button variant="outlined" onClick={setAllProducts}>
              Show All Products
            </Button>
          </div>
          {selectedCategory !== null && (
            <CategoryProducts categoryId={selectedCategory} />
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
