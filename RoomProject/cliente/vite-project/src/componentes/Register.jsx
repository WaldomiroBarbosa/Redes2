import React, { useState } from "react"
import { Link } from "react-router-dom"
import Axios from 'axios'

export const Register = (props) => 
{
    const [matricula, setMat] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')

    const createUser = () =>
    {
        Axios.post ('http://localhost:3002/register', 
        {
            studentId: matricula,
            password: senha,
            name: nome
        }).then( () =>
        {
            console.log('User has been created')
        })
    }

    return(
        <div className="auth-form-container">
            <form className="register-form">
                
                <label htmlFor="nome">Nome Completo</label>
                <input value={nome} type="name" name="nome" id="nome"  onChange={(e) => setNome(e.target.value)} placeholter="Nome Sobrenome"/>
                
                <label htmlFor="matricula">Matrícula</label>
                <input value={matricula} type="number" name="matricula" id="matricula" onChange={(e) => setMat(e.target.value)} placeholder="Sua matrícula..."   />

                <label htmlFor="senha">Senha</label>
                <input value={senha} type="password" name="senha" id="senha" onChange= {(e) => setSenha(e.target.value)}  placeholder="********"   />
                
                <Link to={'/'}>
                    <button type="submit" onClick={createUser}>Registrar</button>
                </Link>
            </form>
            <a href="/" className="link-btn">Logar</a>
        </div>
    )
}