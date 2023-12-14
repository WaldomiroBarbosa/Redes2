const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const QRCode = require('qrcode');
const uuid = require('uuid');

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
    const sentEmail = req.body.Email

    const SQL = 'INSERT INTO users (name, studentId, password, email) VALUES (?,?,?,?)'

    const Values = [sentNome, sentMat, sentSenha, sentEmail]

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

// Rota para reservar uma sala
app.post('/reserve-room', async (req, res) => {
    try {
      // Lógica para salvar a reserva no banco de dados
      const reservationId = uuid.v4();
      // ... lógica de salvamento no banco de dados
  
      // Gere o QR code
      const qrCodeDataURL = await generateQRCode(reservationId);
  
      // Envie a resposta ao cliente
      res.json({ reservationId, qrCodeDataURL });
    } catch (error) {
      console.error('Erro ao reservar a sala:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // Função para gerar o QR code
  async function generateQRCode(data) {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(data);
      return qrCodeDataURL;
    } catch (error) {
      console.error('Erro ao gerar o QR code:', error);
      throw error;
    }
  }

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
