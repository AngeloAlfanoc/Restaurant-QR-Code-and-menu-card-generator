import React, { useContext, useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistration";
import { UserInfoContext } from "../../contexts/usercontext";
import ClientSettings from "../../components/clientSettings";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Settings() {
  const { userInfo } = useContext(UserInfoContext);
  const [verifiedUser, setVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (userInfo) {
      try {
        setVerified(userInfo.verified);
      } catch {
        throw new Error("Could Fetch UserInfo");
      }
      setLoading(false);
    }
  }, [userInfo]);

  return (
    <main className="admin">
      {loading && <CircularProgress />}
      {verifiedUser ? (
        <ClientSettings data={userInfo} />
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
