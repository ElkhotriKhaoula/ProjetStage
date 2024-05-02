import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import './Home.css'
import { Link } from 'react-router-dom';


function Home() {
  const [emp, setEmp] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const url = "http://localhost/react/Employeget.php";

  useEffect(() => {
    axios.get(url).then(function (res) {
      setEmp(res.data);
      console.log(res.data)
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handelDelete = (id) => {
    axios.post(`http://localhost/react/EmployeDelete.php`, { id }).then(function (res) {
      setEmp(prev => prev.filter(ele => ele.id !== id))
      

    })
  }



  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg navbar-secondary bg-light mt-5">
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <form className="d-flex my-2 my-lg-0">
            <input
              className="form-control me-lg-2"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
        </div>
      </nav>
      <div>
        <table className="table caption-top table-hover">
          <caption>Liste des Employés</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom et Prenom</th>
              <th>CIN</th>
              <th>Date Naissance</th>
              <th>Date Recrutement</th>
              <th>Situation Familial</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emp.filter((ele) =>
              ele.nom_prenom.toLowerCase().startsWith(searchTerm.toLocaleLowerCase())
            ).map((ele) => (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.nom_prenom}</td>
                <td>{ele.CIN}</td>
                <td>{ele.date_naissance}</td>
                <td>{ele.date_recrutement}</td>
                <td>{ele.situation_familiale}</td>
                <td><Link to={`/DashbordAdmin/Details/${ele.id}`} ><button className="bi bi-eye-fill btn btn-primary"></button></Link></td>
                <td><Link to={`/DashbordAdmin/UpdateEmp/${ele.id}`} ><button className="bi bi-pencil-square btn btn-success"></button></Link></td>
                <td><button onClick={() => handelDelete(ele.id)} className="btnnn"><MdDelete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;