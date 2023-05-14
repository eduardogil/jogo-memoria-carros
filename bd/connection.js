// conexão com BD Mysql
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '92036566',
    database: 'memoria'
});

connection.connect(function (err) {
    if (err){
        console.error('Erro ao realizar conexão com BD: ' + err.stack);
        return;
    }
    console.log('Conectado com id: ' + connection.threadId);
});

connection.query("INSERT INTO ranking (nome, score) VALUES ('EduardoGil','150')", function(err, result){
    if(!err){
        console.log('Pontuacao gravada com sucesso!');
    }else{
        console.log('Erro ao gravar pontuacao!');
    }
});