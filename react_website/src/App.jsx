import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import "./componentsCss/HomePage.module.css";
import Authentication from "./components/Authentication";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Authentication /> <Home /></>} />
        <Route path="/login" element={<><Authentication /> <LogIn /></>} />
      </Routes>
    </>
  );
}

export default App;
