import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function Details() {
    const {id} = useParams();
    const[user,setUser]=useState({});

    useEffect(
        ()=>{
            axios.get(`http://localhost/react/Employeget.php/${id}` ).then(function (res) {
                setUser(res.data);
                console.log(res.data)
            });
        },[id]
    )
    console.log(user)
  return (
    <div>
        <table className="table caption-top table-hover mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom et Prenom</th>
              <th>CIN</th>
              <th>Date Naissance</th>
              <th>Date Recrutement</th>
              <th>Situation Familial</th>
              <th>Grade</th>
              <th>Echelle</th>
              <th>Echelon</th>
              <th>Nombre d'enfants</th>
              <th>Ajouter Enfant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{user.id}</td>
                <td>{user.nom_prenom}</td>
                <td>{user.CIN}</td>
                <td>{user.date_naissance}</td>
                <td>{user.date_recrutement}</td>
                <td>{user.situation_familiale}</td>
                <td>{user.nom_grade}</td>
                <td>{user.echelle}</td>
                <td>{user.echelon}</td>
                <td>{user.nb_enfant} </td>
                <td><Link to={`/dashbordAdmin/AjouterEnf/${user.id}`}><button className='btn btn-primary'><AiOutlineUsergroupAdd /></button></Link></td>
            </tr>
            
          </tbody>
        </table>
    </div>
  )
}
