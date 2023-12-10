import React, { useState } from "react";
import Slider from "../components/slider/Slider";
import ProductList from "../components/product/ProductList";

import Categoryy from "../components/category/Categoryy";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Slider />
      <Categoryy currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <ProductList currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
