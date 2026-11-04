
import React from "react";
import { Box, Typography } from "@mui/material";
import NeuralBackground from "./components/NeuralBackground";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#02050b",
        isolation: "isolate",
      }}
    >
      {/* Fondo neuronal */}
      <NeuralBackground />

      {/* Contenido del portafolio */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Mi Portafolio
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
