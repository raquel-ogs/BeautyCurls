CREATE DATABASE BeautyCurls1;

DROP DATABASE BeautyCurls;

USE BeautyCurls1;

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
-- unique key nome_user (nomeUser),
-- unique key email (email),
constraint fkCurvaturaCabelo foreign key (fkCurvaturaCabelo) references curvaturaCabelo(idCurvatura),
constraint fkFotoPerfil foreign key (fkFotoPerfil) references fotoPerfil(idFotoPerfil)
-- constraint chkEmail check (email like '%@%')
)auto_increment = 10;

INSERT INTO Usuario VALUES
	(null, 'Elena', 'Lima', 'elena_lima', 'elena.lima@outlook.com', 'bananinha123', 7, 3),
	(null, 'Carla', 'Gomes', 'carlaaaa_g', 'carlagomes0403@gmail.com', 'cerejinha123', 9, 2),
	(null, 'Peter', 'Barros', 'peterSemPan', 'peterbarros123@gmail.com', 'laranjinha123', 4, 6),
	(null, 'Ana', 'Beatriz', 'beatriz_anaa', 'aninha456@gmail.com', 'macazinha123', 6, 1),
	(null, 'Lorenzo', 'Silva', 'lor_enzo', 'lorenzo987@gmail.com', 'goiabinha123', 5, 7),
	(null, 'Bruno', 'Fernandez', 'brunin_1', 'bruno012@gmail.com', 'caquizinho123', 9, 4);

SELECT * FROM Usuario;

CREATE TABLE Preferencia(
idPreferencias int primary key auto_increment,
creme varchar(45) not null,
finalizacao varchar(45) not null,
acessorio varchar(45) not null,
escova varchar(45) not null,
pente varchar(45) not null,
fkUsuario int,
constraint fkUsuarioPreferencias foreign key (fkUsuario) references Usuario(idUsuario),
unique key (fkUsuario)
) auto_increment = 1000;

INSERT INTO Preferencia VALUES
	(null, 'Divino Potinho', 'Fitagem Estruturada', 'Bandana', 'Escova Jacaré', 'Pente Garfo', 10),
	(null, 'Definição Máxima', 'Fitagem', 'Tiara', 'Escova Jacaré', 'Pente Maravilha', 11),
	(null, 'Divino Potão', 'Dedoliss', 'Bandana', 'Escova Jacaré', 'Pente Garfo', 12),
	(null, 'Definição Intensa', 'Tesourinha', 'Lenço', 'Escova Mágica', 'Pente de Dentes Largos', 13),
	(null, 'Dona Skala', 'Fitagem Estruturada', 'Bandana', 'Escova Polvo', 'Pente Finalizador', 14),
	(null, '#Mais Cachos', 'Dedoliss', 'Boné', 'Escova Raquete', 'Pente Garfo', 15);
    
SELECT * FROM Preferencia;

CREATE TABLE Postagem(
idPostagem int primary key auto_increment,
titulo varchar(45),
descricao varchar(450),
urlImagem varchar(45),
urlInspiracao varchar(45),
categoria varchar(45),
dtPostagem date,
constraint chkCategoria check (categoria in ('Penteado', 'Receita'))
)auto_increment = 1000;

INSERT INTO Postagem VALUES
	(null, 'Solto + Tiara Falsa', 
    'Esse penteado era muito usado por mim para disfarçar as partes que ainda tinham química do meu cabelo, é super prático de fazer e dá margem para outros tipos de penteados, por exemplo, um Rabo de Cavalo com a Tiara Fake.', 
    'http://localhost:3333/assets/raquel_4.png', 
    'https://www.instagram.com/p/CJbRfkhhuwK/',
    'Penteado', 
    '2023-05-19'),
    (null, 'PUFF + Baby Hair', 
    'Esse penteado é muito amado por cacheados e crespos, ainda mais com um baby hair viramos a 8ª maravilha do mundo haha.', 
    'http://localhost:3333/assets/raquel_3.png', 
    'https://www.youtube.com/watch?v=WjW0lzIZNmw',
    'Penteado', 
    '2023-05-25'),
    (null, 'Coque Com Tranças', 
    'Esse é um penteado que gosto muito por ser fácil e super prático de fazer, dura muitos days after o que facilita no dia a dia.', 
    'http://localhost:3333/assets/raquel_2.png', 
    'https://www.youtube.com/shorts/Ysuc7dKH8_o',
    'Penteado',
    '2023-06-01'),
    (null, 'Coque Abacaxi', 
    'Esse penteado é muito comum entre cacheados e cacheadas, por ser prático e ajudar a não amassar os cachinhos enquanto dormimos.', 
    'http://localhost:3333/assets/raquel.png', 
    'https://www.youtube.com/watch?v=iFUYPagG2EE',
    'Penteado', 
    '2023-06-08');   
   
INSERT INTO Postagem VALUES
	(null, 'Umectação Noturna', 'A umectação noturna consiste na aplicação de algum Óleo Vegetal antes do dia da lavagem, 
	para que o óleo possa agir enquanto você dorme. Ela se encaixa na etapa de Nutrição, pois visa nutrir e fortalecer 
	os cachos com o uso de Óleos Vegetais.', 
	'http://localhost:3333/assets/umectacao.png', 
	null,
	'Receita', 
	'2023-05-07'),
	(null, 'Soro + Açúcar', 'A junção de Soro Fisiológico e Açúcar promove ao cabelo brilho, maciez, alinhamento além de contribuir 
	com a diminuição do frizz nos fios, pois ambos os ingredientes contribuem com a hidratação do cabelo.', 
	'http://localhost:3333/assets/soro_acucar.png',
	null,
	'Receita', 
	'2023-05-18'),
	(null, 'Soro + Óleo de Coco', 
	'O junção Soro Fisiológico e Óleo de Coco, se encaixam na etapa de HidroNutrição do cronograma capilar, já que
	os dois juntos trazem brilho, maciez e ajudam a manter as proteínas do cabelo.', 
	'http://localhost:3333/assets/oleo_de_coco.png', 
	null,
	'Receita', 
	'2023-05-27'),
	(null, 'Soro Fisiológico', 
    'O soro deixa os fios mais hidratados, brilhosos e com menos frizz, por isso amo hidratar meus cachos com o produto.', 
	'http://localhost:3333/assets/soro.png',
	null,
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
	(null, 1004, '250ml de Óleo Vegetal 100% Natural de sua preferência (recomendo Óleo de Coco);'),
	(null, 1005, '2 colheres de (sopa) de creme de sua preferência;'),
	(null, 1005, '1 colher de (sopa) de Soro Fisiológico;'),
	(null, 1005, '1 colher de (sopa) de Açúcar Demerara ou Mascavo;'),
	(null, 1006, '2 colheres de (sopa) de creme de sua preferência;'),
	(null, 1006, '1 colher de (sopa) de Óleo de Coco ExtraVirgem;'),
	(null, 1006, '1 colher de (sopa) de Soro Fisiológico;'),
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
	(null, 1000, 1, 'Separe toda a parte da frente do seu cabelo;'),
	(null, 1000, 2, 'Divida as partes separadas no meio ou no lado (sua preferência);'),
	(null, 1000, 3, 'Molhe o cabelo e passe um pouco de creme nas partes separadas;'),
	(null, 1000, 4, 'Escove bem o cabelo separado e o coloque atrás de sua orelha;'),
	(null, 1000, 5, 'Prenda atrás as partes do cabelo separado com um pompom/xuxinha;'),
	(null, 1000, 6, 'Solte o restante do cabelo e dê volume se preferir;'),
	(null, 1000, 7, 'Pronto! Agora só arrasar com esse penteado ;)'),
	(null, 1001, 1, 'Molhe a raiz com um pouco de água e utilize um creme ou gelatina/gel para hidratar os fios;'),
	(null, 1001, 2, 'Após molhar o cabelo, jogue-o para frente;'),
	(null, 1001, 3, 'Utilizando um cadarço de tênis ou uma meia-calça, prenda-o como se fosse prendê-lo com uma faixa ou lenço;'),
	(null, 1001, 4, 'Aperte bem o cadarço para que fique um PUFF bem alto;'),
	(null, 1001, 5, 'Utilizando uma gelatina ou um produto de sua preferência, escove bem o cabelo tirando todo o frizz;'),
	(null, 1001, 6, 'Utilizando uma escovinha para BabyHair, desenhe-o conforme sua criatividade;'),
	(null, 1001, 7, 'Pronto! Agora você pode arrasar com o AfroPuff ;)'),
	(null, 1002, 1, 'Separe toda a parte da frente do seu cabelo;'),
	(null, 1002, 2, 'Divida as partes separadas no meio;'),
	(null, 1002, 3, 'Trance individualmente as partes do cabelo que foram separadas;'),
	(null, 1002, 4, 'Faça um coque com o restante do cabelo que sobrou;'),
	(null, 1002, 5, 'Prenda as duas tranças em cada lado correspondente de seu cabelo;'),
	(null, 1002, 6, 'Utilize um grampo para prender as pontas das tranças no seu coque;'),
	(null, 1002, 7, 'Faça aquele BabyHair de lei, para dar mais estilo ao penteado;'),
	(null, 1002, 8, 'Pronto! Agora só arrasar com esse penteado ;)'),
	(null, 1003, 1, 'Aplique um produto para hidratar os fios;'),
	(null, 1003, 2, 'Jogue todo o seu cabelo para frente;'),
	(null, 1003, 3, 'Faça um rabo de cavalo alto e o prenda com uma xuxinha frouxa;'),
	(null, 1003, 4, 'Pronto! Agora só arrasar com esse penteado ;)'),
	(null, 1004, 1, 'Passe o óleo no cabelo mecha por mecha, enluvando bem;'),
	(null, 1004, 2, 'Após passar o óleo em todo cabelo, prenda-o em um coque baixo;'),
	(null, 1004, 3, 'Cubra o cabelo com uma touca ou uma camiseta velha, para não manchar seu travesseiro;'),
	(null, 1004, 4, 'Deixe o produto no cabelo por pelo menos 8 horas;'),
    (null, 1004, 5, 'Após passado o tempo, lave o cabelo (recomendá-se utilizar o método CO-WASH) e retire 80% do óleo do cabelo;'),
    (null, 1004, 6, 'Passe o condicionador ou se preferir use um creme condicionante;'),
    (null, 1004, 7, 'Enxague bem o cabelo, para retirar todo o produto do cabelo;'),
    (null, 1004, 8, 'Prontinho! Seu cabelo já está exalando brilho e sedosidade ;)'),
   	(null, 1005, 1, 'Lave o cabelo com o Shampoo de sua prefêrencia;'),
	(null, 1005, 2, 'Após a realização da lavagem, com os cabelos umídos ou molhados passe a mistura mecha a mecha, enluvando bem;'),
	(null, 1005, 3, 'Deixe a mistura agir no cabelo por 30 minutos;'),
	(null, 1005, 4, 'Após passado o tempo, enxague bem o cabelo com água;'),
	(null, 1005, 5, 'Passe o condicionador e deixe agir por 3 minutos;'),
    (null, 1005, 6, 'Enxague bem com água e seu cabelo está pronto para a finalização ;)'),
	(null, 1006, 1, 'Lave o cabelo com o Shampoo de sua prefêrencia;'),
	(null, 1006, 2, 'Após a realização da lavagem, com os cabelos umídos ou molhados passe a mistura mecha a mecha, enluvando bem;'),
	(null, 1006, 3, 'Deixe a mistura agir no cabelo por 30 minutos;'),
	(null, 1006, 4, 'Após passado o tempo, enxague bem o cabelo com água;'),
	(null, 1006, 5, 'Passe o condicionador e deixe agir por 3 minutos;'),
    (null, 1006, 6, 'Enxague bem com água e seu cabelo está pronto para a finalização ;)'),
	(null, 1007, 1, 'Lave o cabelo com o Shampoo de sua prefêrencia;'),
	(null, 1007, 2, 'Após a realização da lavagem, com os cabelos umídos ou molhados passe a mistura mecha a mecha, enluvando bem;'),
	(null, 1007, 3, 'Deixe a mistura agir no cabelo por 15 minutos;'),
	(null, 1007, 4, 'Após passado o tempo, enxague bem o cabelo com água;'),
	(null, 1007, 5, 'Passe o condicionador e deixe agir por 3 minutos;'),
    (null, 1007, 6, 'Enxague bem com água e seu cabelo está pronto para a finalização ;)');

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

SELECT * FROM Salvo;	