import { useState, useEffect } from "react";
import axios from "axios";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useSearch from "../CustomHooks/useSearch";
import useFilter from "../CustomHooks/useFilter";
import useSort from "../CustomHooks/useSort";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search, setSearch } = useSearch();
  const { selectedCategory, setSelectedCategory, categories, filterByCategory } = useFilter(products);
  const { sortedData, sortColumn, sortDirection, handleSortColumn } = useSort(filteredProducts);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let updatedProducts = filterByCategory(products, selectedCategory) || products;
    if (search) {
      updatedProducts = updatedProducts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(updatedProducts);
  }, [search, selectedCategory, products]);

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return <FaSort className="inline-block ml-1" />;
    return sortDirection === "asc" ? <FaSortUp className="inline-block ml-1" /> : <FaSortDown className="inline-block ml-1" />;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <p className="text-4xl font-black text-gray-900 dark:text-white mb-4">Products</p>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products by name..."
          className="border p-2 rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
       <div className="overflow-x-auto">
       <table className="min-w-full">
         <thead>
           <tr className="bg-gray-100">
             <th className="p-2">Image</th>
             <th className="p-2">Name</th>
             <th className="p-2">Price</th>
             <th className="p-2">Category</th>
           </tr>
         </thead>
         <tbody>
           {Array.from({ length: 6 }).map((_, index) => (
             <tr key={index} className="animate-pulse">
               <td className="p-2 text-center"><div className="bg-gray-300 h-16 w-16 mx-auto"></div></td>
               <td className="p-2"><div className="bg-gray-300 h-4 w-3/4 mx-auto"></div></td>
               <td className="p-2"><div className="bg-gray-300 h-4 w-1/2 mx-auto"></div></td>
               <td className="p-2"><div className="bg-gray-300 h-4 w-1/3 mx-auto"></div></td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2 cursor-pointer flex items-center justify-center gap-1" onClick={() => handleSortColumn("price")}>
                  Price <span>{renderSortIcon("price")}</span>
                </th>
                <th className="p-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(product => (
                <tr key={product.id}>
                  <td className="p-2 text-center">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-contain mx-auto" />
                  </td>
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">${product.price}</td>
                  <td className="p-2">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
