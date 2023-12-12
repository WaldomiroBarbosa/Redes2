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
// Rota para verificar o status da sala
app.get('/room/status/:studentId', (req, res) => {
    const studentId = req.params.studentId;

    // Execute a consulta no banco de dados para obter o status da sala com o ID do estudante fornecido
    db.query('SELECT status FROM rooms WHERE studentId = ?', [studentId], (err, result) => {
        if (err) {
            console.error('Erro ao obter status da sala:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            if (result.length > 0) {
                res.json({ status: result[0].status });
            } else {
                res.status(404).json({ error: 'Sala não encontrada' });
            }
        }
    });
});

// Rota para marcar a sala como liberada
app.post('/room/free/:studentId', (req, res) => {
    const studentId = req.params.studentId;

    // Execute a consulta no banco de dados para atualizar o status da sala para 'free'
    db.query('UPDATE rooms SET status = "free" WHERE studentId = ?', [studentId], (err, result) => {
        if (err) {
            console.error('Erro ao marcar a sala como liberada:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: 'Sala marcada como liberada' });
            } else {
                res.status(404).json({ error: 'Sala não encontrada' });
            }
        }
    });
});
