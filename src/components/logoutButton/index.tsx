import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { logout } from "../../services/auth";
import { useHistory } from "react-router-dom";

function LogoutButton(props: any) {
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Button
      className={props.className}
      variant="contained"
      type="submit"
      color="secondary"
      onClick={handleLogout}
    >
      logout
    </Button>
  );
}

export default LogoutButton;
