import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import "./index.scss";
import item_1 from "../../assets/slick/item_1.jpg";
import item_2 from "../../assets/slick/item_2.jpg";
import Nav from "../../components/menuNav";
import { useHistory } from "react-router-dom";
import Slide from "./slide";

export default function HeroSlider() {
  const history = useHistory();
  const handleLink = (link) => {
    history.push(link);
  };
  var settings = {
    dots: false,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };
  return (
    <div className="position-relative">
      <div className="container-fluid">
        <Nav />
      </div>
      <Slider {...settings}>
        <Slide
          subtitle="Checkinify.be"
          headtitle="Digitaliseer uw checkins en menu kaarten"
          desc="Genereer een QR code, krijg een volledig overzicht van alle
                consumenten die hebben ingecheckt via deze QR code."
          clickEvent={() => handleLink("#features")}
          buttonText="Meer info"
          image={item_2}
        />
        <Slide
          subtitle="Voorkom het verspreiden van bacterië"
          headtitle="Nu starten"
          desc=" Voorkom de verspreiding van het corona virus en ga digitaal."
          clickEvent={() => handleLink("/register")}
          buttonText="Registreer"
          image={item_1}
        />
      </Slider>
    </div>
  );
}
