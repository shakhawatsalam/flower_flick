import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useProductsQuery } from "@/redux/features/product/productApi";
import React, { useState } from "react";
import FilterproductSection from "./FilterproductSection";
import ProductList from "./ProductList";

export const ProductListWithFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortValue, setSortValue] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const { data: flowers, isFetching } = useProductsQuery({
    searchTerm: debouncedSearchTerm,
    categories: selectedCategory,
    priceRange: debouncedPriceRange,
    sortValue: sortValue,
    page: page,
  });
  const { data: categories } = useGetAllCategoriesQuery();
  return (
    <>
      <FilterproductSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        priceRange={priceRange}
        setSortValue={setSortValue}
        setPriceRange={setPriceRange}
      />
      <ProductList
        page={page}
        setPage={setPage}
        flowers={flowers}
        isFetching={isFetching}
        totalPages={Math.ceil((flowers?.count || 0) / 4)}
      />
    </>
  );
};
