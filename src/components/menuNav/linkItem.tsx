import React from "react";
import "./index.scss";
import AnchorLink from "react-anchor-link-smooth-scroll";
interface PropsLinkItem {
  text: string;
  offset: string;
  href: string;
}

export default function LinkItem(props: PropsLinkItem) {
  return (
    <li>
      <AnchorLink offset={props.offset} href={props.href}>
        {props.text}
      </AnchorLink>
    </li>
  );
}
