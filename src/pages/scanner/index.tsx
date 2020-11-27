import CodeScanner from "react-camera-qr";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Typography, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function Home() {
  const history = useHistory();
  const [scan, setScan] = useState();
  const [error, setError] = useState();
  const handleScan = (data: any) => {
    if (data) {
      setScan(data);
    }
  };

  const handleError = (err: any) => {
    setError(err);
  };
  useEffect(() => {
    scan && history.push(scan);
  }, [scan, history]);

  return (
    <main className="consumer__portal">
      <Container>
        <CssBaseline />
        <Typography className="my-3" variant="h4">
          Scan de code om verder te gaan.
        </Typography>
        <CodeScanner
          delay={300}
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
      </Container>
    </main>
  );
}
