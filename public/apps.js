const express = require("express");
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3002;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

const dbConnection = new sqlite3.Database('exemplo.db');

// Antes da criação da tabela, remova a tabela existente (se houver)
dbConnection.run('DROP TABLE IF EXISTS usuarios', () => {
    // Crie a tabela novamente
    dbConnection.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, email TEXT, senha TEXT)', () => {
        // Inicie o servidor após a criação da tabela
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    });
});

app.post('/submit', (req, res) => {
    const { uname, password } = req.body;

    const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    dbConnection.run(sql, [uname, password], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao inserir dados no banco de dados');
        } else {
            res.send('Dados inseridos com sucesso!');
        }
    });
});