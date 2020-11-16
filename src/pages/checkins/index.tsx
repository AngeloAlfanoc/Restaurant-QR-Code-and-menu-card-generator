import React, { useContext, useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistrationDialog";
import { UserInfoContext } from "../../contexts/usercontext";
export default function CheckIns() {
  const { userInfo } = useContext(UserInfoContext);
  const [verifiedUser, setVerified] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      try {
        setVerified(userInfo.verified);
      } catch {
        throw new Error("Could Fetch UserInfo");
      }
    }
  }, [userInfo]);

  return (
    <main className="admin">
      {verifiedUser
        ? "showCheckins"
        : userInfo && <ClientRegistrationDialog id={userInfo.docid} />}
    </main>
  );
}
