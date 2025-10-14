import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App backendUrl={backendUrl} />);

