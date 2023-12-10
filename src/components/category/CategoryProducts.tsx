import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { Product } from "../../types/productTypes";
import ProductDetailCard from "../../components/product/ProductDetailCard";

interface CategoryProductsProps {
  categoryId: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryId }) => {
  const products = useSelector((state: RootState) =>
    Object.values(state.product.products).filter(
      (product: Product) => product.categoryId === categoryId
    )
  );

  return (
    <div>
      <h2>Products in this Category{categoryId}</h2>
      {products.map((product) => (
        <ProductDetailCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CategoryProducts;
