import FilterproductSection from "@/components/Shop/FilterproductSection";
import ProductList from "@/components/Shop/ProductList";
import ShopHero from "@/components/Shop/ShopHero";
import React from "react";

const ShopPage = () => {
  return (
    <>
      <ShopHero />
      <FilterproductSection />
      <ProductList />
    </>
  );
};

export default ShopPage;
