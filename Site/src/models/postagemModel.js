var database = require("../database/config")

function listarPenteadosRecentes() {
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPenteadosRecentes()");
    var instrucao = `
    SELECT idPostagem, titulo, descricao, urlImagem, categoria, DATE_FORMAT(dtPostagem, '%d/%m/%Y') AS dtPostagemFormatada FROM Postagem
    WHERE categoria = 'Penteado' ORDER BY dtPostagem DESC LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPenteados() {
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPenteados()");
    var instrucao = `
    SELECT idPostagem, titulo, descricao, urlImagem, categoria, DATE_FORMAT(dtPostagem, '%d/%m/%Y') AS dtPostagemFormatada, 
    (SELECT COUNT(fkPostagem) FROM Curtida WHERE fkPostagem = Postagem.idPostagem) AS qtdCurtida,
    (SELECT COUNT(fkPostagem) FROM Salvo WHERE fkPostagem = Postagem.idPostagem) AS qtdSalvo FROM Postagem
            LEFT JOIN Curtida ON Curtida.fkPostagem = idPostagem
                LEFT JOIN Salvo ON Salvo.fkPostagem = idPostagem
                WHERE categoria = 'Penteado'
                ORDER BY dtPostagem DESC;
            `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarReceitas() {
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarReceitas()");
    var instrucao = `
    SELECT idPostagem, titulo, descricao, urlImagem, categoria, DATE_FORMAT(dtPostagem, '%d/%m/%Y') AS dtPostagemFormatada, 
    (SELECT COUNT(fkPostagem) FROM Curtida WHERE fkPostagem = Postagem.idPostagem) AS qtdCurtida,
    (SELECT COUNT(fkPostagem) FROM Salvo WHERE fkPostagem = Postagem.idPostagem) AS qtdSalvo FROM Postagem
            LEFT JOIN Curtida ON Curtida.fkPostagem = idPostagem
                LEFT JOIN Salvo ON Salvo.fkPostagem = idPostagem
                WHERE categoria = 'Receita'
                ORDER BY dtPostagem DESC;
                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPostagem(idPost) {
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPostagem()", idPost);
    var instrucao = `
    SELECT idPostagem, titulo, descricao, urlImagem, urlInspiracao, categoria, DATE_FORMAT(dtPostagem, '%d/%m/%Y') AS dtPostagem, 
    (SELECT COUNT(fkPostagem) FROM Curtida WHERE fkPostagem = Postagem.idPostagem) AS qtdCurtida,
    (SELECT COUNT(fkPostagem) FROM Salvo WHERE fkPostagem = Postagem.idPostagem) AS qtdSalvo FROM Postagem
            LEFT JOIN Curtida ON Curtida.fkPostagem = idPostagem
                LEFT JOIN Salvo ON Salvo.fkPostagem = idPostagem
                WHERE Postagem.idPostagem = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarIngredientes(idPost) {
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarIngredientes()", idPost);
    var instrucao = `
        SELECT * FROM ingredienteReceita
        WHERE fkPostagem = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPassos(idPost) {
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPassos()", idPost);
    var instrucao = `
        SELECT * FROM passoPostagem
        WHERE fkPostagem = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function atualizarCurtida(fkPostagem){
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarCurtida()", fkPostagem);
    var instrucao = `
        SELECT COUNT(fkPostagem) AS qtdCurtida FROM Curtida
        WHERE fkPostagem = ${fkPostagem};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSalvo(fkPostagem){
    console.log("ACESSEI O POSTAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSalvo()", fkPostagem);
    var instrucao = `
        SELECT COUNT(fkPostagem) AS qtdSalvo FROM Salvo
        WHERE fkPostagem = ${fkPostagem};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listarPenteadosRecentes,
    listarPenteados,
    listarReceitas,
    listarPostagem,
    listarIngredientes,
    listarPassos,
    atualizarCurtida,
    atualizarSalvo
};