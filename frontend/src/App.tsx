import React from "react";
import Default from "./layouts/Default";
import Pages from "./pages";
import { Container } from "@mui/material";

function App() {
  return (
    <Default>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <Pages />
      </Container>
    </Default>
  );
}

export default App;
