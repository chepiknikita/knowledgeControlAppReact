import React from "react";
import Default from "./layouts/Default";
import Pages from "./pages";
import { Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
