import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import Main from "./Main";

const el = document.getElementById("app") as HTMLElement;
const root = createRoot(el);

root.render(<Main />);
