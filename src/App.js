import "./App.css";
import { Route, Routes, useLocation, Router } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" Component={RegistrationPage} ></Route>
          <Route path="/home" Component={Home} ></Route>
          <Route path="/login" Component={LoginPage} ></Route>
        </Routes>
    </>
  );
}

export default App;
