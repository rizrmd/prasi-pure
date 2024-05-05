import { GlobalContext } from "@/lib/use-global";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Base } from "./parts/base";
import { initWS } from "./ws/init";

document.body.innerHTML = '<div id="root"></div>';

const Provider = GlobalContext.Provider;
const el = document.getElementById("root");

if (el) {
  initWS();
  const root = createRoot(el);
  const Root = () => {
    const [, render] = useState({});
    return (
      <Provider
        value={{
          global: {},
          render() {
            render({});
          },
        }}
      >
        <Base />
      </Provider>
    );
  };
  root.render(<Root />);
}
