import React from "react";
import Button from "../../buttons/button";
import ScrollAnimation from "react-animate-on-scroll";
import "./index.scss";

export default function Slide(props: any) {
  return (
    <div className="custom">
      <div className="headline">
        <span className="my-1 caption">{props.subtitle}</span>
        <ScrollAnimation animateIn="slideInUp" duration={0.5}>
          <h1 className="my-0">{props.headtitle}</h1>
        </ScrollAnimation>
        <ScrollAnimation animateIn="slideInUp" duration={0.6}>
          <p className="desc">{props.desc}</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="slideInUp" duration={0.7}>
          <Button className="btn primary__button" onClick={props.clickEvent}>
            {props.buttonText}
          </Button>
        </ScrollAnimation>
      </div>
      <img className="s-zoom" alt="Carrousel item1" src={props.image}></img>
    </div>
  );
}
