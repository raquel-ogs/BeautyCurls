var database = require("../database/config")

function listarQtdVisitas(fkUsuario){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQtdVisitas()", fkUsuario);
    var instrucao = `
        SELECT COUNT(DISTINCT(fkPostagem)) AS qtdVisitas FROM Visita
        WHERE fkUsuario = ${fkUsuario};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarQtdCurtidas(fkUsuario){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQtdCurtidas()", fkUsuario);
    var instrucao = `
        SELECT COUNT(fkUsuario) AS qtdCurtida FROM Curtida
        WHERE fkUsuario = ${fkUsuario};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarQtdSalvos(fkUsuario){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQtdSalvos()", fkUsuario);
    var instrucao = `
        SELECT COUNT(fkUsuario) AS qtdSalvo FROM Salvo
        WHERE fkUsuario = ${fkUsuario};                
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarQtdPosts(){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQtdPosts()");
    var instrucao = `
        SELECT COUNT(idPostagem) AS qtdPosts FROM Postagem             
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInteracaoHoje(fkUsuario){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarInteracaoHoje()", fkUsuario);
    var instrucao = `
        SELECT 1 as qtdCurtida, 1 as qtdSalvo, hrCurtida, hrSalvo FROM Curtida
            JOIN Salvo ON Salvo.fkUsuario = Curtida.fkUsuario
                WHERE Curtida.fkUsuario = ${fkUsuario} AND dtCurtida = CURRENT_DATE()
                    GROUP BY Curtida.fkPostagem;          
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInteracaoAno(fkUsuario, mes){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarInteracaoAno()", fkUsuario, mes);
    var instrucao = `
        SELECT COUNT(DISTINCT(Curtida.fkPostagem)) AS qtdCurtida, COUNT(DISTINCT(Salvo.fkPostagem)) AS qtdSalvo FROM Curtida
            JOIN Salvo ON Salvo.fkUsuario = Curtida.fkUsuario
                WHERE Curtida.fkUsuario = ${fkUsuario} AND dtCurtida LIKE '2023-_${mes}%';             
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarQtdVisitas,
    listarQtdCurtidas,
    listarQtdSalvos,
    listarQtdPosts,
    buscarInteracaoHoje,
    buscarInteracaoAno
};