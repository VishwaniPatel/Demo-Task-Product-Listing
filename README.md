# Product Listing Component

## Overview
The `ProductListing` component is a React-based product listing page that supports **search, filtering, and sorting** functionalities. It fetches product data from the [Fake Store API](https://fakestoreapi.com/) and allows users to:
- Search for products by name
- Filter products by category
- Sort products by price
- View product images, names, prices, and categories

## Features
- **Fetching Data**: Uses `axios` to retrieve products from an external API.
- **Custom Hooks**:
  - `useSearch()`: Handles product search functionality.
  - `useFilter()`: Manages category-based filtering.
  - `useSort()`: Handles sorting logic for products.
- **Sorting**: Supports ascending and descending sorting of product prices.

## Code Explanation
### State Management
- `products`: Stores all fetched products.
- `filteredProducts`: Stores the products after applying search and filters.
- `loading`: Tracks API fetch status.
- `search`: Search query state from `useSearch`.
- `selectedCategory`: Stores selected category from `useFilter`.

### API Data Fetching
- Products are fetched inside a `useEffect` hook using `axios.get()`.
- The fetched data is stored in `products` and `filteredProducts`.

### Search Functionality
- Uses `useSearch()` to manage the `search` state.
- Filters products based on the `title` field.

### Filtering by Category
- Uses `useFilter()` to manage categories.
- Filters `products` based on the selected category.

### Sorting
- Uses `useSort()` to enable sorting by price.
- Clicking the price column toggles sorting order (`asc` or `desc`).

## Dependencies
- `react`
- `axios`
- `react-icons`
- `tailwindcss` (optional, for styling)

