var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT Usuario.idUsuario, Usuario.nome, Usuario.sobrenome, Usuario.nomeUser, Usuario.email, Usuario.senha, fkCurvaturaCabelo, curvaturaCabelo.nome AS nomeCurvatura, url FROM Usuario 
            JOIN curvaturaCabelo ON curvaturaCabelo.idCurvatura = Usuario.fkCurvaturaCabelo
                JOIN fotoPerfil ON fotoPerfil.idFotoPerfil = Usuario.fkFotoPerfil
                    WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarFotoPerfil() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFotoPerfil()");
    var instrucao = `
        SELECT * FROM fotoPerfil
        ORDER BY titulo ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function atualizarFotoPerfil(idUsuario, fkFotoPerfil){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarFotoPerfil()");
    var instrucao = `
        UPDATE Usuario SET fkFotoPerfil = ${fkFotoPerfil}
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarQtdFotoPerfil() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarQtdFotoPerfil()");
    var instrucao = `
        SELECT COUNT(idFotoPerfil) AS qtdFoto FROM fotoPerfil;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarEmail(): ", email);
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarUser(user) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarUser(): ", user)
    var instrucao = `
        SELECT * FROM Usuario WHERE nomeUser = '${user}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarDadosPessoais(idUsuario, nome, sobrenome, nomeUser, curvaturaCabelo, email, senha){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarFotoPerfil()");
    var instrucao = `
        UPDATE Usuario SET nome = '${nome}', sobrenome = '${sobrenome}', nomeUser = '${nomeUser}',
        fkCurvaturaCabelo = ${curvaturaCabelo}, email = '${email}', senha = '${senha}'
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, user, email, senha, curvatura, fotoPerfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, user, email, senha, curvatura);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobrenome, nomeUser, email, senha, fkCurvaturaCabelo, fkFotoPerfil) VALUES ('${nome}', '${sobrenome}', '${user}', '${email}', '${senha}', ${curvatura}, ${fotoPerfil});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarVisita(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarVisita():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Visita VALUES (null, ${fkUsuario}, ${fkPostagem}, CURRENT_DATE(), CURRENT_TIME());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPostsCurtidos(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPostsCurtidos()", fkUsuario);
    var instrucao = `
    SELECT idPostagem, titulo, descricao, urlImagem, categoria, DATE_FORMAT(dtPostagem, '%d/%m/%Y') AS dtPostagemFormatado, 
    (SELECT COUNT(fkPostagem) FROM Curtida WHERE fkPostagem = Postagem.idPostagem) AS qtdCurtida,
    (SELECT COUNT(fkPostagem) FROM Salvo WHERE fkPostagem = Postagem.idPostagem) AS qtdSalvo FROM Postagem
            LEFT JOIN Curtida ON Curtida.fkPostagem = idPostagem
                LEFT JOIN Salvo ON Salvo.fkPostagem = idPostagem
                WHERE Curtida.fkUsuario = ${fkUsuario}
                ORDER BY dtPostagem DESC;
                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarCurtida(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarCurtida():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Curtida VALUES (${fkUsuario}, ${fkPostagem}, CURRENT_DATE(),  CURRENT_TIME());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarCurtida(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarCurtida():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        SELECT * FROM Curtida WHERE fkUsuario = ${fkUsuario} AND fkPostagem = ${fkPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function apagarCurtida(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarCurtida():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        DELETE FROM Curtida WHERE fkUsuario = ${fkUsuario} AND fkPostagem = ${fkPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarPostsSalvos(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPostsSalvos()", fkUsuario);
    var instrucao = `
    SELECT idPostagem, titulo, descricao, urlImagem, categoria, DATE_FORMAT(dtPostagem, '%d/%m/%Y') AS dtPostagemFormatado, 
    (SELECT COUNT(fkPostagem) FROM Curtida WHERE fkPostagem = Postagem.idPostagem) AS qtdCurtida,
    (SELECT COUNT(fkPostagem) FROM Salvo WHERE fkPostagem = Postagem.idPostagem) AS qtdSalvo FROM Postagem
            LEFT JOIN Curtida ON Curtida.fkPostagem = idPostagem
                LEFT JOIN Salvo ON Salvo.fkPostagem = idPostagem
                WHERE Salvo.fkUsuario = ${fkUsuario}
                ORDER BY dtPostagem DESC;
                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarSalvo(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarSalvo():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        SELECT * FROM Salvo WHERE fkUsuario = ${fkUsuario} AND fkPostagem = ${fkPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function adicionarSalvo(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarSalvo():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Salvo VALUES (${fkUsuario}, ${fkPostagem}, CURRENT_DATE(), CURRENT_TIME());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function apagarSalvo(fkUsuario, fkPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarSalvo():", fkUsuario, fkPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        DELETE FROM Salvo WHERE fkUsuario = ${fkUsuario} AND fkPostagem = ${fkPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarQtdCurtida(fkUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarQtdCurtida()", fkUsuario);
    var instrucao = `
        SELECT COUNT(fkUsuario) AS qtdCurtida FROM Curtida
        WHERE fkUsuario = ${fkUsuario};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarQtdSalvo(fkUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarQtdSalvo()", fkUsuario);
    var instrucao = `
        SELECT COUNT(fkUsuario) AS qtdSalvo FROM Salvo
        WHERE fkUsuario = ${fkUsuario};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    entrar,
    verificarUser,
    verificarEmail,
    atualizarFotoPerfil,
    verificarQtdFotoPerfil,
    listarFotoPerfil,
    atualizarDadosPessoais,
    cadastrar,
    adicionarVisita,
    listarPostsCurtidos,
    verificarCurtida,
    adicionarCurtida,
    apagarCurtida,
    listarPostsSalvos,
    verificarSalvo,
    adicionarSalvo,
    apagarSalvo,
    verificarQtdCurtida,
    verificarQtdSalvo
};