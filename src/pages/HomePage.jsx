import CampaignHighlight from "@/components/Home/CampaignHighlight";
import HeroCarousel from "@/components/Home/HeroCarousel";
import NewsletterSignup from "@/components/Home/NewsletterSignup";
import PromoBanner from "@/components/Home/PromoBanner";
import TestimonialCard from "@/components/Home/TestimonialCard";
import ProductList from "@/components/Shop/ProductList";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <PromoBanner />
      <TestimonialCard />
      <ProductList />
      <CampaignHighlight />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
