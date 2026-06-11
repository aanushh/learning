import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./AsyncApp.tsx";
import LikeApp from "./LikeApp";
import "./index.css";
import Form from "./Form";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>

    <hr />
    <br />
    <br />

    <LikeApp />

    <hr />
    <br />
    <br />

    <Form />
  </StrictMode>,
);
