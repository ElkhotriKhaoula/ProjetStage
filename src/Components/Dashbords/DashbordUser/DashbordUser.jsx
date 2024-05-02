import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';



export default function DashbordUser() {
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});

  const handelLogout = () => {
    localStorage.clear();
    navigate("/")
  }

  useEffect(
    () => {
      const user = localStorage.getItem("login");
      if (!user) {
        navigate("/LoginPage");
      } else {
        const login = JSON.parse(user);
        if (login.role !== "user") {
          navigate("/LoginPage");
        }
        setEmp(login)
        console.log(login);
      }
    }, []
  )
  return (
    <div className='container-fluid bg-light min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100 d-print-none'>
          <div className='bg-white sidebar p-1 text-center'>
            <i className='bi bi-person-fill me-3 fs-2 float-start'></i>
            <span className='admin fs-6'>{emp.nom_prenom}</span>
          </div>
          <hr className='text-dark' />
          <div className='list-group list-group-flush'>
            <div className=' list-group-item py-2 d-flex'>
              <i className='bi bi-house-fill fs-5 me-3'></i>
              <Link className='text-dark text-decoration-none' to={"/DashbordUser/Securite"}><span className='fs-5' >Home</span></Link>
            </div>

            <div className='list-group-item py-2 '>
              <i className='bi bi-gear-fill fs-5 me-3'></i>
              <Link className='text-dark text-decoration-none' to={"/DashbordUser/Securite"}><span className='fs-5' >Parametre</span></Link>
            </div>
            <div className=' list-group-item py-2'>
              <i className='bi bi-patch-question-fill fs-5 me-3'></i>
              <Link className='text-dark text-decoration-none' to={"/DashbordUser/Securite"}><span className='fs-5' >Aide</span></Link>
            </div>
            <div className='list-group-item py-2' >
              <i className='bi bi-box-arrow-left fs-5 me-2'></i>
              <span className='fs-5' onClick={handelLogout}>Deconnexion</span>
            </div>
          </div>
        </div>
        <div className='col-10'>
          <div className='float-end fs-1 mt-3 d-print-none'>
            <i className="bi bi-printer" onClick={() => window.print()}></i>
          </div>
          <table className='table table-striped'>
            <tbody>
              <tr>
                <td className="fw-bold">Nom</td>
                <td>{emp.nom_prenom?.toUpperCase()}</td>
              </tr>
              <tr>
                <td className="fw-bold">CIN</td>
                <td>{emp.CIN}</td>
              </tr>
              <tr>
                <td className="fw-bold">Situation familiale</td>
                <td>{emp.situation_familiale}</td>
              </tr>
              <tr>
                <td className="fw-bold">Date de naissance</td>
                <td>{new Date(emp.date_naissance).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="fw-bold">Date de recrutement</td>
                <td>{new Date(emp.date_recrutement).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="fw-bold">Nom de grade</td>
                <td>{emp.nom_grade}</td>
              </tr>
              <tr>
                <td className="fw-bold">Echelle</td>
                <td>{emp.echelle}</td>
              </tr>
              <tr>
                <td className="fw-bold">Echelon</td>
                <td>{emp.echelon}</td>
              </tr>
              <tr>
                <td className="fw-bold">Nombre d'enfant</td>
                <td>{emp.nb_enfant}</td>
              </tr>
              <tr>
                <td className="fw-bold">Salaire</td>
                <td><span className="badge bg-success">50.000 MAD</span></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  )
}
