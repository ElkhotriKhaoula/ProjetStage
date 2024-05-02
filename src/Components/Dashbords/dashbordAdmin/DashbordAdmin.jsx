
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import SideBar from './SideBar';
import Home from './Home';



export default function DashbordAdmin() {
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    navigate("/")
  }

  const [users, setUsers] = useState([]);

  const url = "http://localhost/react/adminget.php";

 

  useEffect(
    () => {
      const user = localStorage.getItem("login");
      if (!user) {
        navigate("/LoginPage");
      } else {
        const login = JSON.parse(user);
        if (login.role !== "admin") {
          navigate("/LoginPage");
        }

      }
    }, []
  )

  return (
    <div className='container-fluid bg-light min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <SideBar logout={handelLogout} />
        </div>
        <div className='col-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
