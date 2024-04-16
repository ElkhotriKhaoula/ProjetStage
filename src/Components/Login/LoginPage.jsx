import { useEffect, useState } from 'react';
import './Login.css'


export default function LoginPage() {
  const[email, setEmail] = useState('');
  const[mdp, setMdp]= useState('');
  const[error, setError]= useState([])

  
  const handelClick=(e)=>{
    e.preventDefault()
    setError([])
    if(!email){
      setError(prev=>[...prev, "veuillez entrer votre email"])
    }else if(!mdp){
      setError(prev=>[...prev, "veuillez entrer votre mot de passe"])
    }
  }
  return (
    <div className='container mt-3'>
        <form>
            <div className='from-group mb-3'>
                <label htmlFor='email'>Entrer l'email :</label>
                <input type='text' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} id='email'/>
                <p style={{color: 'red', fontSize: '12px'}}>{error.includes("veuillez entrer votre email")&& "veuillez entrer votre email"} </p>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='mdp' >Entrer mot de passe :</label>
                <input type='text' className='form-control' value={mdp} onChange={(e)=>setMdp(e.target.value)} id='mdp'/>
                <p style={{color: 'red', fontSize: '12px'}}>{error.includes("veuillez entrer votre mot de passe")&& "veuillez entrer votre mot de passe"} </p>
            </div>
            <div>
                <button onClick={handelClick}>Login</button>
            </div>
        </form>
    </div>
  )
}