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

app.get('/buscar-usuario/:studentId', (req, res) => {
    const sentMatricula = req.params.studentId;

    // Lógica para buscar o usuário no banco de dados
    const SQL = 'SELECT * FROM users WHERE studentId = ?';

    db.query(SQL, [sentMatricula], (err, results) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            if (results.length > 0) {
                res.status(200).send({ studentId: results[0].studentId });
            } else {
                res.status(404).send({ message: 'Usuário não encontrado' });
            }
        }
    });
});

const inserirNovoUsuario = (matricula, res) => {
    // Inserir novo usuário na tabela do grupo
    const insereUsuarioSQL = 'INSERT INTO grupos (membro_1) VALUES (?)';
    
    db.query(insereUsuarioSQL, [matricula], (err) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: 'Usuário adicionado ao grupo com sucesso.' });
      }
    });
  };

  const atualizarGrupo = (matricula, res, colunaVaziaNome) => {
    // Atualizar grupo com novo usuário em uma coluna vazia (NULL)
    const atualizaUsuarioSQL = `UPDATE grupos SET ${colunaVaziaNome} = ?`;
    
    db.query(atualizaUsuarioSQL, [matricula], (err) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: 'Usuário adicionado ao grupo com sucesso.' });
      }
    });
  };

  app.post('/adicionar-usuario-ao-grupo/:matricula', (req, res) => {
    const matricula = req.params.matricula;
  
    // Verifica se o usuário já está no grupo
    const buscaUsuarioSQL = 'SELECT * FROM grupos WHERE membro_1 = ? OR membro_2 = ? OR membro_3 = ? OR membro_4 = ? OR membro_5 = ? OR membro_6 = ? OR membro_7 = ? OR membro_8 = ?';
  
    db.query(buscaUsuarioSQL, [matricula, matricula, matricula, matricula, matricula, matricula, matricula, matricula], (err, results) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        if (results.length === 0) {
          // Se o grupo estiver vazio, inserir o novo usuário
          inserirNovoUsuario(matricula, res);
        } else {
          // Se o grupo já tiver membros, atualizar o grupo
          const colunaVaziaNome = encontrarColunaVazia(results[0]);
          if (colunaVaziaNome) {
            atualizarGrupo(matricula, res, colunaVaziaNome);
          } else {
            res.status(400).send({ message: 'O grupo já está cheio.' });
          }
        }
      }
    });
  });
  
  
  // Função auxiliar para encontrar a primeira coluna vazia
  const encontrarColunaVazia = (grupo) => {
    for (let i = 1; i <= 8; i++) {
      const colunaVaziaNome = `membro_${i}`;
      if (!grupo[colunaVaziaNome]) {
        return colunaVaziaNome;
      }
    }
    return null; // Retorna null se todas as colunas estiverem ocupadas
  };
  