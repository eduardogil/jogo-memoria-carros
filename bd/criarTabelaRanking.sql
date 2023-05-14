-- Criando a Tabela Ranking!
create table ranking (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    PRIMARY KEY (id)
);