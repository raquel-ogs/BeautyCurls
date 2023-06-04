CREATE DATABASE BeautyCurls;

USE BeautyCurls;

CREATE TABLE fotoPerfil(
idFotoPerfil int primary key auto_increment,
url varchar(100)
);

INSERT INTO fotoPerfil VALUES
	(null, '../assets/coala.png'),
	(null, '../assets/coelho.png'),
	(null, '../assets/coruja.png'),
	(null, '../assets/gato.png'),
	(null, '../assets/jaguar.png'),
	(null, '../assets/leao.png'),
	(null, '../assets/pinguim.png'),
	(null, '../assets/tartaruga.png'),
	(null, '../assets/tigre.png'),
	(null, '../assets/vaca.png');
    
SELECT * FROM fotoPerfil;

CREATE TABLE curvaturaCabelo(
idCurvatura int primary key auto_increment,
nome char(2) not null
);

INSERT INTO curvaturaCabelo VALUES
	(null, '1'),
	(null, '2A'),
	(null, '2B'),
	(null, '2C'),
	(null, '3A'),
	(null, '3B'),
	(null, '3C'),
	(null, '4A'),
	(null, '4B'),
	(null, '4C');
    
SELECT * FROM curvaturaCabelo;

CREATE TABLE Usuario(
idUsuario int primary key auto_increment,
nome varchar(45) not null,
sobrenome varchar(45) not null,
nomeUser varchar(45) not null,
email varchar(45) not null,
senha varchar(45) not null,
fkCurvaturaCabelo int,
fkFotoPerfil int,
unique key nome_user (nomeUser),
unique key email (email),
constraint fkCurvaturaCabelo foreign key (fkCurvaturaCabelo) references curvaturaCabelo(idCurvatura),
constraint fkFotoPerfil foreign key (fkFotoPerfil) references fotoPerfil(fotoPerfil),
constraint chkEmail check (email like '%@%')
);

SELECT * FROM Usuario;

INSERT INTO Usuario VALUES
	(null, 'Elena', 'Lima', 'elena_lima', 'elena.lima@outlook.com', 'bananinha123', 7, 3),
	(null, 'Carla', 'Gomes', 'carlaaaa_g', 'carlagomes0403@gmail.com', 'cerejinha123', 9, 2),
	(null, 'Peter', 'Barros', 'peterSemPan', 'peterbarros123@gmail.com', 'laranjinha123', 4, 6),
	(null, 'Ana', 'Beatriz', 'beatriz_anaa', 'aninha456@gmail.com', 'macazinha123', 6, 1),
	(null, 'Lorenzo', 'Silva', 'lor_enzo', 'lorenzo987@gmail.com', 'goiabinha123', 5, 7);
    
CREATE TABLE Postagem(
idPostagem int primary key auto_increment,
titulo varchar(45),
descricao varchar(250),
urlImagem varchar(45),
categoria varchar(45),
dataHora datetime,
qtdLikes int,
constraint chkCategoria check (categoria in ('Penteados', 'Produtos', 'Receitas'))
)auto_increment = 100;

INSERT INTO Postagem VALUES
	()

