import React from "react";
import Default from "./layouts/Default";
import Pages from "./pages";
import { Container } from "@mui/material";

function App() {
  return (
    <Default>
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          width: "100%",
          my: 4,
        }}
      >
        <Pages />
      </Container>
    </Default>
  );
}

export default App;
