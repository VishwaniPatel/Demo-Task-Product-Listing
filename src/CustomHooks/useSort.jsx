import { useMemo, useState } from "react";

const useSort = (data = []) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
  
    const sortedData = useMemo(() => {
      if (!sortColumn || data.length === 0) return data; // Ensure no sorting if data is empty
  
      return [...data].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
  
        if (typeof valueA === "string") {
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
        }
      });
    }, [data, sortColumn, sortDirection]);
  
    const handleSortColumn = (column) => {
      setSortColumn(column);
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };
  
    return { sortedData, sortColumn, sortDirection, handleSortColumn };
  };
  
  export default useSort;
  