import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// MUI Theme
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored" // 🔥 looks good with your UI
        />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);