import React from "react";
import "./index.scss";

export default function PageNotFound() {
  // Ogen volgen muis beweging.
  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>

        <div className="box__ghost-container">
          <div className="box__ghost-eyes">
            <div className="box__eye-left"></div>
            <div className="box__eye-right"></div>
          </div>
          <div className="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="box__ghost-shadow"></div>
      </div>

      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">
            <h5>Whoops!</h5>
          </div>
          <div className="box__description-text">
            <span>Het lijkt erop dat de pagina die u zoekt niet bestaat.</span>
          </div>
        </div>

        <a href="#" target="_blank" className="box__button">
          Terug gaan
        </a>
      </div>
    </div>
  );
}
