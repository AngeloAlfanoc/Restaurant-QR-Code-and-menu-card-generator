import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as WebsiteLogo } from "../../assets/svg/logo.svg";

interface ILogo {
  width: string;
  height: string;
}

export default function Logo(props: ILogo) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <WebsiteLogo
      onClick={handleClick}
      width={props.width}
      height={props.height}
    />
  );
}
