import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import icon from "../../assets/icon.svg";
import "./App.css";
import Dropzone from "./components/Dropzone";
import Login from "./components/login/Login";
import Menu from "../renderer/components/login/Menu";
import FillExample from "../renderer/components/tabs";

import "bootstrap/dist/css/bootstrap.min.css";

function Hello() {
  return (
    <div>
      {/* <Menu /> */}

      {/* <div className="Hello"> */}
      {/* <img width="200" alt="icon" src={icon} /> */}
      {/* </div> */}
      {/* <h1>electron-react-boilerplate</h1> */}
      {/* <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div> */}
      {/* <Dropzone className="p-16 mt-10 border border-green-500	" /> */}
      <Login className="p-16 mt-10 border border-green-500	" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        {/* <Route path="Dropzone" element={<Dropzone />} /> */}
        <Route path="Dropzone" element={<FillExample />} />
      </Routes>
    </Router>
  );
}
