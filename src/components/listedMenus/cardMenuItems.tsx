import React, { useEffect, useState } from "react";
import { getMenuItemData } from "../../services/crud";
export default function CardMenuItems(props: { id: string }) {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const getMenuItems = async () => {
      return await getMenuItemData(props.id);
    };
    const subscribe = getMenuItems;
    setPayload(subscribe);
    return () => {
      subscribe();
    };
  }, [props.id]);

  return <div></div>;
}
