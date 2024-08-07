import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export function Registro(){
    const [name, setName]=useState("")
    const [lasName, setLasName]=useState("")
    const [email, setEmail]=useState("")
    const [numero, setNumero]=useState("")
    const [password, setPassword]=useState("")
    const [password2, setPassword2]=useState("")


    return(
        <div className="container mt-5">
          <form noValidate>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                    Apellidos: 
                </label>
                < input type="text" className="form-control" value={lasName} onChange={(e)=>setLasName(e.target.value)}/>
            </div>

            <div className="mb-3">
               <label htmlFor="email" className="form-label">
                   Email:
               </label>
               < input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
            <label class="form-control-label" for="registration-form-phone">
            Teléfono
            </label>
            <input type="tel" class="form-control" id="registration-form-phone" data-missing-error="Campo obligatorio."   placeholder="xxxx xxxx" value={numero} onChange={(e)=>setNumero(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Contraseña: </label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
            </div>

            <div className="mb-3">
                <label className="form-label">Confirmar contraseña: </label>
                <input type="password" className="form-control" value={password2} onChange={(e)=>setPassword2(e.target.value)}/> 
            </div>

            <button type="submit" className="btn btn-primary">
                Registrarse
            </button>
        

              
            </form>
        </div>
    )
}
export default Registro