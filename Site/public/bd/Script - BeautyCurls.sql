CREATE DATABASE BeautyCurls;

USE BeautyCurls;

CREATE TABLE fotoPerfil(
idFotoPerfil int primary key auto_increment,
titulo varchar(45),
url varchar(100)
);

INSERT INTO fotoPerfil VALUES
	(null, 'Sr. Eduard', '../assets/coala.png'),
	(null, 'Puff', '../assets/coelho.png'),
	(null, 'Linda', '../assets/coruja.png'),
	(null, 'Bob', '../assets/gato.png'),
	(null, 'Sr. Manchas', '../assets/jaguar.png'),
	(null, 'Simba', '../assets/leao.png'),
	(null, 'Luna', '../assets/pinguim.png'),
	(null, 'Gema', '../assets/tartaruga.png'),
	(null, 'Diego', '../assets/tigre.png'),
	(null, 'Mimosa', '../assets/vaca.png');
        
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
constraint fkFotoPerfil foreign key (fkFotoPerfil) references fotoPerfil(idFotoPerfil),
constraint chkEmail check (email like '%@%')
)auto_increment = 100;

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
dtPostagem date,
constraint chkCategoria check (categoria in ('Penteado' or 'Receita'))
)auto_increment = 1000;

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
   
INSERT INTO Postagem VALUES
	(null, 'Umectação Noturna', null, 
	'http://localhost:3333/assets/umectacao.png', 
	'Receita', 
	'2023-05-07'),
	(null, 'Soro + Açúcar', null, 
	'http://localhost:3333/assets/soro_acucar.png', 
	'Receita', 
	'2023-05-18'),
	(null, 'Soro + Óleo de Coco', null, 
	'http://localhost:3333/assets/oleo_de_coco.png', 
	'Receita', 
	'2023-05-27'),
	(null, 'Soro Fisiológico', 
    'O soro deixa os fios mais hidratados, brilhosos e com menos frizz, por isso amo hidratar meus cachos com o produto.', 
	'http://localhost:3333/assets/soro.png', 
	'Receita',
	'2023-06-02');
	
SELECT * FROM Postagem;

CREATE TABLE ingredienteReceita(
idIngrediente int auto_increment,
fkPostagem int,
descricao varchar(200),
constraint fkPostagemIngrediente foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaIngredienteReceita primary key (idIngrediente, fkPostagem)
);

INSERT INTO ingredienteReceita VALUES
	(null, 1007, '2 colheres de (sopa) de creme de sua preferência;'),
	(null, 1007, '1 colher de (sopa) de Soro Fisiológico.');
    
SELECT * FROM ingredienteReceita;

CREATE TABLE passoPostagem(
idPassoPostagem int auto_increment,
fkPostagem int,
numPasso int,
descricao varchar(200),
constraint fkPostagemPasso foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaPasso primary key (idPassoPostagem, fkPostagem)
) auto_increment = 10000;

INSERT INTO passoPostagem VALUES
	(null, 1007, 1, 'Lave o cabelo com o Shampoo de sua prefêrencia;'),
	(null, 1007, 2, 'Após a realização da lavagem, com os cabelos umídos ou molhados passe a mistura mecha a mecha, enluvando bem;'),
	(null, 1007, 3, 'Deixe a mistura agir no cabelo por 15 minutos;'),
	(null, 1007, 4, 'Após passado o tempo, enxague bem o cabelo com água;'),
	(null, 1007, 5, 'Passe o condicionador e deixe agir por 3 minutos;'),
    (null, 1007, 6, 'Enxague bem com água e seu cabelo está pronto para a finalização.');
    
SELECT * FROM passoPostagem;

CREATE TABLE Visita(
idVisita int auto_increment,
fkUsuario int,
fkPostagem int,
dtVisita date,
hrVisita time,
constraint fkUsuarioVisita foreign key (fkUsuario) references Usuario(idUsuario),
constraint fkPostagemVisita foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaVisita primary key (idVisita, fkUsuario, fkPostagem)
);

SELECT * FROM Visita;

SELECT AVG((SELECT COUNT(fkUsuario) FROM Visita)) AS mediaInteracao FROM Visita
	GROUP BY fkUsuario;

CREATE TABLE Curtida(
fkUsuario int,
fkPostagem int,
dtCurtida date,
hrCurtida time,
constraint fkUsuarioCurtida foreign key (fkUsuario) references Usuario(idUsuario),
constraint fkPostagemCurtida foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaCurtida primary key (fkUsuario, fkPostagem)
);

SELECT * FROM Curtida;
		
CREATE TABLE Salvo(
fkUsuario int,
fkPostagem int,
dtSalvo date,
hrSalvo time,
constraint fkUsuarioSalvo foreign key (fkUsuario) references Usuario(idUsuario),
constraint fkPostagemSalvo foreign key (fkPostagem) references Postagem(idPostagem),
constraint pkCompostaSalvo primary key (fkUsuario, fkPostagem)
);

alter table visita modify column dtVisita datetime;

  SELECT hrCurtida, hrSalvo FROM Curtida
            JOIN Salvo ON Salvo.fkUsuario = Curtida.fkUsuario
                WHERE Curtida.fkUsuario = 105 AND dtCurtida = CURRENT_DATE()
					GROUP BY Curtida.fkPostagem;
                
                
                select * from curtida;
