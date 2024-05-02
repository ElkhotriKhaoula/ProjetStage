import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./Components/NavBar/NavBar";
//import LoginPage from "./Components/Login/LoginPage";
import LoginPage from "./Components/Login/SignInSide";
import DashbordAdmin from "./Components/Dashbords/dashbordAdmin/DashbordAdmin";
import DashbordUser from "./Components/Dashbords/DashbordUser/DashbordUser";
import AddUser from "./Pages/AddUser";
import Home from "./Components/Dashbords/dashbordAdmin/Home";
import Details from "./Components/Dashbords/dashbordAdmin/Details/Details";
import AjouterEnf from "./Components/Dashbords/dashbordAdmin/AjouterEnfant/AjouterEnf";
import UpdateEmp from "./Components/Dashbords/dashbordAdmin/UpdateEmp/Update";
import Securite from "./Components/Dashbords/DashbordUser/Securite/Securite";


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/DashbordAdmin" element={<DashbordAdmin />} >
            <Route index element={<Home />} />
            <Route path="Add" element={<AddUser />} />
            <Route path="Details/:id" element={<Details />} />
            <Route path="AjouterEnf/:id" element={<AjouterEnf />} />
            <Route path="UpdateEmp/:id" element={<UpdateEmp />} />
           </Route>
          <Route path="/DashbordUser" element={<DashbordUser />} >
            <Route path="Securite" element={<Securite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
