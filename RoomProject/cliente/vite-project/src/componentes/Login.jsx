
import React, { useState } from "react"


export const Login = (props) => 
{
        const [matricula, setMat] = useState('')
        const [senha, setSenha] = useState('')


    return(
        <div className="auth-form-container">
            <form className="login-form">
            
                <span className="sucess-span">Status</span>
            
                <label htmlFor="matricula">Matrícula</label>
                <input value={matricula} type="number" onChange={(e) => setMat(e.target.value)} placeholder="Sua matrícula..." id="matricula" name="matricula" />

                <label htmlFor="senha">Senha</label>
                <input value={senha} onChange= {(e) => setSenha(e.target.value)} type="password" placeholder="********" id="senha" name="senha" />
            
                <button type="submit">Acessar</button>
            </form>
            
            <a href="/register" className="link-btn">Registrar</a>
        </div>
    )
}