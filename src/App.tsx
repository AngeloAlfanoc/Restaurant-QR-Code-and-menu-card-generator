import React from "react";
import Router from "./services/router";
import UserProvider from "./contexts/userContext";

export function App() {
  return (
    <>
      <UserProvider>
        <Router />
      </UserProvider>
    </>
  );
}

export default App;
