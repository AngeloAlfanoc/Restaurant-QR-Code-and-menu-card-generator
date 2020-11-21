import React from "react";
import "./index.scss";
type Props = {
  text?: string;
  disable?: boolean;
  className?: string;
  onClick: Function;
  children: {};
};
export default function Button(props: Props) {
  const { text, disable, className, onClick, children = "Click" } = props;
  const value = text || children;

  return (
    <button
      className={disable ? `disable ${className}` : className}
      onClick={(e) => onClick(e)}
    >
      {value}
    </button>
  );
}
