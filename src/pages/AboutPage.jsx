import AboutUsHero from "@/components/AboutUs/AboutUsHero";
import CampaignHighlightAboutUs from "@/components/AboutUs/CampaignHighlightAboutUs";
import FlowerExperts from "@/components/AboutUs/FlowerExperts";
import TestimonialCard from "@/components/AboutUs/TestimonialCard";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <AboutUsHero />
      <CampaignHighlightAboutUs />
      <FlowerExperts />
      <TestimonialCard/>
    </>
  );
};

export default AboutPage;
