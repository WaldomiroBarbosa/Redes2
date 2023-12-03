import React, { useState } from "react"
import { Link } from "react-router-dom"
import Axios from 'axios'

export const Register = (props) => 
{
    const [matricula, setMat] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')

    //const handleSubmit = (e) => {
       // e.preventDefault()
       // console.log(matricula)
    //}

    const createUser = () =>
    {
        Axios.post('http://localhost:3003/register', {
            Matricula: matricula,
            Senha: senha,
            Nome: nome
        }).then(()=>{
            console.log('User has been created')
        })
    }

    return(
        <div className="auth-form-container">
        <form className="register-form">
            <label htmlFor="nome">Nome Completo</label>
            <input value={nome} name="nome" id="nome" placeholter="Nome Sobrenome" onChange={(e) => setNome(e.target.value)}/>
            <label htmlFor="matricula">Matrícula</label>
            <input value={matricula} type="number" onChange={(e) => setMat(e.target.value)} placeholder="Sua matrícula..." id="matricula" name="matricula" />

            <label htmlFor="senha">Senha</label>
            <input value={senha} onChange= {(e) => setSenha(e.target.value)} type="password" placeholder="********" id="senha" name="senha" />
            <Link to={'/'}><button type="submit">Registrar</button></Link>
        </form>
        <a href="/" className="link-btn">Logar</a>
        </div>
    )
}