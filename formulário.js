// formulário

document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        var uname = form.querySelector('[name=uname]').value;
        var password = form.querySelector('[name="password"]').value;

        // Exemplo Exibir os Valores no Console
        console.log('Username:', uname);
        console.log('Password', password);
        //Adicione aqui a Lógica para Interagir com SQL
    });
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('exemplo.db');

// Criar uma tabela chamada 'Usuários' 
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');

    //Inserir alguns dados de exemplo 
    const stmt = db.prepare('INSERT INTO usuarios (name, email) VALUES (?,?)');
    stmt.run('Usuario1','usuario@email.com');
    stmt.run('Usuario2','usuario2@gmail.com');
    stmt.finalize(); 
});

// Consultar todos os usuários

db.each('SELECT * FROM usuarios' , (err,row) => {
    console.log(row);
});

// Fecha o Bando de dados 
db.close();