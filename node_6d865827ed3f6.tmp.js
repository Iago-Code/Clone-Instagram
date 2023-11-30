const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); // Seus arquivos HTML, CSS, JS devem estar na pasta 'public'

// Criar o banco de dados e a tabela
const db = new sqlite3.Database('exemplo.db');
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
    db.close(); // Fechar a conexão com o banco de dados
});

// Rota para lidar com o envio do formulário
app.post('/submit', (req, res) => {
    const { uname, password } = req.body;

    const db = new sqlite3.Database('exemplo.db');

    // Inserir os dados no banco de dados
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO usuarios (name, email) VALUES (?,?)');
        stmt.run(uname, password);
        stmt.finalize();

        db.close(); // Fechar a conexão com o banco de dados
    });

    res.send('Dados inseridos com sucesso!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});