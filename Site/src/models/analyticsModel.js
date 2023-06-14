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

function buscarCurtidaHoje(fkUsuario, hora){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarCurtidaHoje()", fkUsuario, hora);
    var instrucao = `
        SELECT COUNT(DISTINCT(Curtida.fkPostagem)) AS qtdCurtida, '${hora}:00:00' AS hrCurtida FROM Curtida
            WHERE fkUsuario = ${fkUsuario} AND dtCurtida = CURRENT_DATE() AND hrCurtida LIKE '${hora}%';             
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarCurtidaMes(fkUsuario, mes){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarCurtidaMes()", fkUsuario, mes);
    var instrucao = `
        SELECT COUNT(DISTINCT(Curtida.fkPostagem)) AS qtdCurtida FROM Curtida
           RIGHT JOIN Usuario ON Curtida.fkUsuario = Usuario.idUsuario
                WHERE idUsuario = ${fkUsuario} AND dtCurtida LIKE '2023-_${mes}%';             
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarSalvoHoje(fkUsuario, hora){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarSalvoHoje()", fkUsuario, hora);
    var instrucao = `
        SELECT COUNT(DISTINCT(Salvo.fkPostagem)) AS qtdSalvo, '${hora}:00:00' AS hrSalvo FROM Salvo
            WHERE fkUsuario = ${fkUsuario} AND dtSalvo = CURRENT_DATE() AND hrSalvo LIKE '${hora}%';             
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarSalvoMes(fkUsuario, mes){
    console.log("ACESSEI O ANALYTICS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarSalvoMes()", fkUsuario, mes);
    var instrucao = `
        SELECT COUNT(DISTINCT(Salvo.fkPostagem)) AS qtdSalvo FROM Salvo
           RIGHT JOIN Usuario ON Salvo.fkUsuario = Usuario.idUsuario
                WHERE idUsuario = ${fkUsuario} AND dtSalvo LIKE '2023-_${mes}%';             
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listarQtdVisitas,
    listarQtdCurtidas,
    listarQtdSalvos,
    listarQtdPosts,
    buscarCurtidaHoje,
    buscarCurtidaMes,
    buscarSalvoHoje,
    buscarSalvoMes
};