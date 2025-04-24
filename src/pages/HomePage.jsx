import CampaignHighlight from "@/components/Home/CampaignHighlight";
import HeroCarousel from "@/components/Home/HeroCarousel";
import NewsletterSignup from "@/components/Home/NewsletterSignup";
import PromoBanner from "@/components/Home/PromoBanner";
import TestimonialCard from "@/components/Home/TestimonialCard";
import ProductList from "@/components/Shop/ProductList";
import { ProductListWithFilter } from "@/components/Shop/ProductListWithFilter";
import { useProductsQuery } from "@/redux/features/product/productApi";

const HomePage = () => {
  const { data: flowers, isFetching } = useProductsQuery({
    searchTerm: "",
    categories: "",
    priceRange: [0, 100],
    sortValue: "",
    page: "",
  });

  return (
    <>
      <HeroCarousel />
      <PromoBanner />
      <TestimonialCard />
      <ProductList flowers={flowers} isFetching={isFetching} />
      <CampaignHighlight />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
