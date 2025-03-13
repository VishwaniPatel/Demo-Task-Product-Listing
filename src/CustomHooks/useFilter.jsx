import { useState } from "react";

const useFilter = (products) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filterByCategory = (productsList, category) => {
    if (category === "All") return productsList;
    return productsList.filter((p) => p.category === category);
  };

  return { selectedCategory, setSelectedCategory, categories, filterByCategory };
};

export default useFilter;
