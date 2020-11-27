import React from "react";
import ConsumerMenuCard from "../../components/consumerMenuCard";
export default function MenuDetail(props: any) {
  return (
    <>
      <ConsumerMenuCard menu={props.match.params.id} />
    </>
  );
}
