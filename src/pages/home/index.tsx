import React from "react";
import Prices from "../../components/views/pricing";
import Slider from "../../components/heroSlider";

import Footer from "../../components/footer";
export default function Home() {
  return (
    <>
      <Slider />
      <Prices />
      <Footer />
    </>
  );
}
