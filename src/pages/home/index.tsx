import React from "react";
import Prices from "../../components/views/pricing";
import Slider from "../../components/misc/heroSlider";

import Footer from "../../components/misc/footer";
export default function Home() {
  return (
    <>
      <Slider />
      <Prices />
      <Footer />
    </>
  );
}
