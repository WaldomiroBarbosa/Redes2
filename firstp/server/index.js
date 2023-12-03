const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('Server on port 3003')
})

const db = mysql.createConnection (
    {
        user: 'root',
        host: 'localhost',
        password: '',
        database: 'Salas'
    }
)

module.exports = db

app.post('/register', (req, res)=>
{
    const sentMat = req.body.Matricula
    const sentSenha = req.body.Senha
    const sentNome = req.body.Nome

    const SQL = 'INSERT INTO users (Matricula, Senha, Nome) VALUES (?,?,?)'

    const Values = [sentEmail, sentUserName, sentPassword]

    db.query(SQL, Values, (err, res) => {
        if(err)
        {
            res.send(err)
        } else 
        {
            console.log('User inserted success!')
            res.send({message: 'User added!'})
        }
    })
})