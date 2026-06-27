import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#18181b',
              color: '#f4f4f5',
              borderRadius: '12px',
              border: '1px solid #27272a',
              fontSize: '14px',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
