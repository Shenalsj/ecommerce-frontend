//CategoryProducts.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { Product } from "../../types/productTypes";

interface CategoryProductsProps {
  categoryId: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryId }) => {
  const [name, setName] = useState("");
  const products = useSelector((state: RootState) =>
    Object.values(state.product.products).filter(
      (product: Product) => product.categoryId === categoryId
    )
  );

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );

    setName(selectedCategory?.name || "");
  }, [categoryId]);

  return (
    <div>
      <h2>Products in this Category {name}</h2>
    </div>
  );
};

export default CategoryProducts;
