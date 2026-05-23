import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter 
    future={{ 
      v7_startTransition: true, 
      v7_relativeSplatPath: true 
    }}
  >
    <StyleProvider layer>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </StyleProvider>
  </BrowserRouter>
);