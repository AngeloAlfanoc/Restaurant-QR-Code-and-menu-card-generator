import React from "react";
import "./index.scss";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { IPropsLinkItem } from "../../types";

export default function LinkItem(props: IPropsLinkItem) {
  return (
    <li>
      <AnchorLink offset={props.offset} href={props.href}>
        {props.text}
      </AnchorLink>
    </li>
  );
}
