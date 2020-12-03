import React from "react";
import ClientRegistrationDialog from "../../components/forms/clientRegistration";
import ClientSettings from "../../components/forms/clientSettings";
import { useSelector, RootStateOrAny } from "react-redux";
export default function Settings() {
  const userInfo = useSelector((state: RootStateOrAny) => state.userInfo);

  return (
    <main className="admin">
      {userInfo.verified ? (
        <ClientSettings data={userInfo} />
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
