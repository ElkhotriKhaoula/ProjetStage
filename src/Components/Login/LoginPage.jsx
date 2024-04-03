import React from 'react'

export default function LoginPage() {
  return (
    <div className='container mt-3'>
        <form>
            <div className='from-group mb-3'>
                <label htmlFor='email'>Entrer l'email :</label>
                <input type='text' className='form-control' id='email'/>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='mdp' >Entrer mot de passe :</label>
                <input type='text' className='form-control' id='mdp'/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
  )
}
