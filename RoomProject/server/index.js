const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(3002, () => {
    console.log('Server on port 3002')
})

const db = mysql.createConnection (
    {
        user: 'root',
        host: 'localhost',
        password: '',
        database: 'salas',
    }
)

module.exports = db

app.post('/register', (req, res)=>
{
    const sentMat = req.body.studentId
    const sentSenha = req.body.password
    const sentNome = req.body.name

    const SQL = 'INSERT INTO users (name, studentId, password) VALUES (?,?,?)'

    const Values = [sentNome, sentMat, sentSenha]

    db.query(SQL, Values, (err, results) => {
        if (err)
        {
            res.send(err)
        } else 
        {
            console.log('User inserted success!')
            res.send({message: 'User added!'})
        }
    })
})