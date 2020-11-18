import React from "react";
import Prices from "../../components/pricing";
import Slider from "../../components/heroSlider";
import PhoneMockup from "../../components/phoneMockup";
export default function Home() {
  return (
    <>
      <PhoneMockup />
      <Slider />
      <Prices />
    </>
  );
}
