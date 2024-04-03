import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import LoginPage from "./Components/Login/LoginPage";
import Home from "./Pages/Home/Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/LoginPage" element= {<LoginPage /> } />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
