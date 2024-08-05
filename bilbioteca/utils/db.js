const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost", // Nome do serviço do Docker
    port: 3306, // Porta padrão do MySQL
    user: "user",
    password: "userpassword",
    database: "dbbiblioteca", // Altere para o nome do banco de dados que você definiu no docker-compose
    multipleStatements: true
});

db.connect((erro) => {
    if (erro) {
        throw erro;
    }
    console.log('Conectado ao DB...');
});

global.db = db;
module.exports = db;
