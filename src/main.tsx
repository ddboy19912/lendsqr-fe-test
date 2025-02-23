import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
// import { worker } from "./mocks/browser";
import "./styles/index.scss";

// if (import.meta.env.MODE === "development") {
//   await worker.start();
// }

const queryClient = new QueryClient();

setTimeout(() => {
  document.getElementById("pre-react-loader")!.style.display = "none";
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
