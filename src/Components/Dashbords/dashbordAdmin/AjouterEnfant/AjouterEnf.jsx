import React, { useState } from 'react'
import "./AjouterEnf.css";
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function AjouterEnf() {
    
    const {id} = useParams();

    const[name, setName]= useState("");
    const[date, setDate]= useState("");
    const[error, setError]= useState("");
    const[res, setRes]= useState("");

    const handelClick=()=>{
        if(!name || !date){
            setError("Veuillez remplir tous les champs")
        }
        else{
            setError("")
            axios.post('http://localhost/react/AjouterEnfant.php', {name, date , id}).then(function (res) {
                setRes(res.data);
                setName("");
                setDate("");
            });
        }
    }


  return (
    <div className='containerrr mt-5'>
        <div className='res text-success'>{res}</div>
        <div className='err text-danger'>{error}</div>
        <label className='lbl'>Nom et Prenom</label>
        <input type='text' className='inp' value={name} onChange={(e)=>setName(e.target.value)}/>
        <label className='lbl'>Date de Naissance</label>
        <input type='date'  className='inp' value={date} onChange={(e)=>setDate(e.target.value)}/>
        <button className='btnn' onClick={handelClick}>Ajouter</button>
    </div>
  )
}
