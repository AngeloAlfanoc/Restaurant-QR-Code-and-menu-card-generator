import React, { useContext } from "react";
import Button from "../../buttons/button";
import { useHistory } from "react-router-dom";
import "./index.scss";
import Logo from "../../misc/logo";
import LinkItem from "./linkItem";
import { UserContext } from "../../../contexts/userContext";
export default function Nav() {
  let history = useHistory();
  const { user } = useContext(UserContext);
  function handleClick(link: string) {
    history.push(link);
  }

  return (
    <nav className="desktop_nav nav__props">
      <div className="d-flex flex-column align-items-center text-white">
        <Logo width="100" height="100" />
        <span className="mt-1">Checkinify.be</span>
      </div>
      <ul>
        <LinkItem text="Home" offset="100" href="/" />
        <LinkItem text="Mogelijkheden" offset="100" href="#features" />
        <LinkItem text="Oplossingen" offset="100" href="#solutions" />
        <LinkItem text="Deelnemers" offset="100" href="#participants" />
        <LinkItem text="Contact" offset="100" href="#contact" />
        {!user ? <>
          <li className="ml-5">
            <Button className="btn primary__button" onClick={() => handleClick("/login")}>
              Login
          </Button>
          </li>
          <li>
            <Button className="btn primary__button" onClick={() => handleClick("/register")}>
              Registreer
          </Button>
          </li></> : <li className="ml-5">
            <Button className="btn primary__button" onClick={() => handleClick("/account/dashboard")}>
              Dashboard
          </Button>
          </li>}
      </ul>
    </nav>
  );
}
