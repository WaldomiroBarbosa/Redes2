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
    console.log('Received POST request to /register');
    const sentMat = req.body.StudentId
    const sentSenha = req.body.Password
    const sentNome = req.body.Name

    const SQL = 'INSERT INTO users (name, studentId, password) VALUES (?,?,?)'

    const Values = [sentNome, sentMat, sentSenha]

    db.query(SQL, Values, (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            console.log('User inserted successfully!');
            res.status(200).send({ message: 'User added!' });
        }
    })
})

app.post('/login', (req, res) => {
    console.log('Received POST request to /login');
    
    const sentLoginMat = req.body.LoginStudentId
    const sentLoginSenha = req.body.LoginPassword

    const SQL = 'SELECT * FROM users WHERE studentId = ? && password = ?'

    const Values = [sentLoginMat, sentLoginSenha]

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send({ error: err });
        } if (results.length >  0) {
            res.send(results)
        } else {
            res.send({ message: 'Usuario nao encontrado!' })
        }
    })

})
