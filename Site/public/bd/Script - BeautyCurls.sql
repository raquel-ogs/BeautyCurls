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
)auto_increment = 100;

SELECT * FROM Usuario;

INSERT INTO Usuario VALUES
	(null, 'Elena', 'Lima', 'elena_lima', 'elena.lima@outlook.com', 'bananinha123', 7, 3),
	(null, 'Carla', 'Gomes', 'carlaaaa_g', 'carlagomes0403@gmail.com', 'cerejinha123', 9, 2),
	(null, 'Peter', 'Barros', 'peterSemPan', 'peterbarros123@gmail.com', 'laranjinha123', 4, 6),
	(null, 'Ana', 'Beatriz', 'beatriz_anaa', 'aninha456@gmail.com', 'macazinha123', 6, 1),
	(null, 'Lorenzo', 'Silva', 'lor_enzo', 'lorenzo987@gmail.com', 'goiabinha123', 5, 7);
    
CREATE TABLE cronogramaCapilar(
idCronogramaCapilar int primary key auto_increment
)auto_increment = 1000;
    
CREATE TABLE Postagem(
idPostagem int primary key auto_increment,
titulo varchar(45),
descricao varchar(250),
urlImagem varchar(45),
categoria varchar(45),
dtPostagem date,
constraint chkCategoria check (categoria in ('Penteado', 'Produto', 'Receita'))
)auto_increment = 10000;

INSERT INTO Postagem VALUES
	(null, 'Solto + Tiara Falsa', 
    'Esse penteado é muito amado por cacheados e crespos, ainda mais com um baby hair viramos a 8ª maravilha do mundo haha.', 
    'http://localhost:3333/assets/raquel_4.png', 
    'Penteado', 
    '2023-05-19'),
    (null, 'PUFF + Baby Hair', 
    'Esse penteado é muito amado por cacheados e crespos, ainda mais com um baby hair viramos a 8ª maravilha do mundo haha.', 
    'http://localhost:3333/assets/raquel_3.png', 
    'Penteado', 
    '2023-05-25'),
    (null, 'Coque Com Tranças', 
    'Esse é um penteado que gosto muito por ser fácil e super prático de fazer, dura muitos days after o que facilita no dia a dia.', 
    'http://localhost:3333/assets/raquel_2.png', 
    'Penteado', 
    '2023-06-01'),
    (null, 'Coque Abacaxi', 
    'Esse penteado é muito comum entre cacheados e cacheadas, por ser prático e ajudar a não amassar os cachinhos enquanto dormimos.', 
    'http://localhost:3333/assets/raquel.png', 
    'Penteado', 
    '2023-06-08');
    
SELECT * FROM Postagem;

CREATE TABLE Curtida(
fkUsuario int,
fkPostagem int,
dtCurtida date,
constraint fkUsuarioCurtida foreign key (fkUsuario) references Usuario(idUsuario),
constraint fkPostagemCurtida foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaCurtida primary key (fkUsuario, fkPostagem)
);

INSERT INTO Curtida VALUES
	(1, 10000, NOW());

SELECT * FROM Curtida;

CREATE TABLE Salvo(
fkUsuario int,
fkPostagem int,
dtSalvo date,
constraint fkUsuarioSalvo foreign key (fkUsuario) references Usuario(idUsuario),
constraint fkPostagemSalvo foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaSalvo primary key (fkUsuario, fkPostagem)
);

SELECT * FROM Salvo;


