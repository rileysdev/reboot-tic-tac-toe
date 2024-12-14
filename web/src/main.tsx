import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RebootClient, RebootClientProvider } from "@reboot-dev/reboot-react"

import "./index.css";
import App from "./App.tsx";

const client = new RebootClient("http://127.0.0.1:9991")

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <RebootClientProvider client={client}>
      <App />
    </RebootClientProvider>
  // </StrictMode>,
);
