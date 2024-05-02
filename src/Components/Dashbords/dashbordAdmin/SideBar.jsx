import React from 'react';
import "./SideBar.css";
import { Link } from 'react-router-dom';

function SideBar({logout}) {
  return (
    <div className='bg-white sidebar p-1'>
        <div>
            <i className='bi bi-person-fill me-3 fs-4'></i>
            <span className='admin fs-4'>Admin</span>
        </div>
        <hr className='text-dark' />
        <div className='list-group list-group-flush'>
            <div className=' list-group-item py-2 d-flex'>
                <i className='bi bi-house-fill fs-5 me-3'></i>
                <Link to={"/DashbordAdmin"} className='nav-link'><span className='fs-5'>Home</span></Link>
            </div>

            <div className=' list-group-item py-2 d-flex'>
                <i className='bi bi-person-plus-fill fs-5 me-3'></i>
                <Link to={'/DashbordAdmin/Add'} className='nav-link'> <span className='fs-5'>Ajouter</span></Link>
            </div>

            <div className=' list-group-item py-2 '>
                <i className='bi bi-gear-fill fs-5 me-3'></i>
                <span className='fs-5'>Parametre</span>
            </div>
            <div className=' list-group-item py-2'>
                <i className='bi bi-patch-question-fill fs-5 me-3'></i>
                <span className='fs-5'>Aide</span>
            </div>
            <div className=' list-group-item py-2 ' onClick={logout}>
                <i className='bi bi-box-arrow-left fs-5 me-2'></i>
                <span className='fs-5'>Deconnexion</span>
            </div>
        </div>
    </div>
  )
}

export default SideBar