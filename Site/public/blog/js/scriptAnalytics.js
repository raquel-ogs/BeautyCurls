var fkUsuario = sessionStorage.ID;
var qtdInteracaoUsuario = 0;
var qtdPosts = 0;

function calcularMediaInteracao() {
    var mediaInteracao = (qtdInteracaoUsuario / (qtdPosts * 2)) * 100;
    qtdInteracao.innerHTML = `${mediaInteracao.toFixed(2)}% de interação`
}

function obterDados() {
    fetch(`/analytics/listarQtdVisitas/${fkUsuario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(visita => {
                    var qtdVisitas = Number(visita[0].qtdVisitas);
                    qtdPostVisitado.innerHTML = qtdVisitas;

                    if(qtdVisitas <= 1){
                        qtdPostVisitado.innerHTML += " post"
                    } else {
                        qtdPostVisitado.innerHTML += " posts";
                    }                })
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

    fetch(`/analytics/listarQtdCurtidas/${fkUsuario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(visita => {
                    var qtdCurtidos = Number(visita[0].qtdCurtida);
                    qtdPostCurtido.innerHTML = qtdCurtidos;
                    qtdInteracaoUsuario += qtdCurtidos;

                    if(qtdCurtidos <= 1){
                        qtdPostCurtido.innerHTML += " post"
                    } else {
                        qtdPostCurtido.innerHTML += " posts";
                    }
                })
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

    fetch(`/analytics/listarQtdSalvos/${fkUsuario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(visita => {
                    var qtdSalvos = Number(visita[0].qtdSalvo);
                    qtdPostSalvo.innerHTML = qtdSalvos;
                    qtdInteracaoUsuario += qtdSalvos;

                    if(qtdSalvos <= 1){
                        qtdPostSalvo.innerHTML += " post"
                    } else {
                        qtdPostSalvo.innerHTML += " posts";
                    }
                    
                })
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

    fetch(`/analytics/listarQtdPosts/`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(posts => {
                    qtdPosts = Number(posts[0].qtdPosts);
                })
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

    setTimeout(calcularMediaInteracao, 100);
}

var registrosInteracao = [];
var mesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']

function obterDadosGraficoLinha() {
    fetch(`/analytics/buscarInteracaoHoje/${fkUsuario}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(resposta)
                    plotarGraficoLinha(resposta);
                })
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}

function obterDadosGraficoBarra() {
    for (var contadorMes = 1; contadorMes <= 12; contadorMes++) {
        fetch(`/analytics/buscarInteracaoAno/${fkUsuario}/${contadorMes}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        registrosInteracao.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });
    }

    setTimeout(() => {plotarGraficoBarra(registrosInteracao)}, 200);
}

function plotarGraficoLinha(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labelsHoje = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosHoje = {
        labels: labelsHoje,
        datasets: [{
            label: 'Curtiu',
            backgroundColor: 'rgba(112, 61, 87, 0.35)',
            borderColor: 'rgba(112, 61, 87, 1)',
            data: [],
            borderWidth: 1.5
        },
        {
            label: 'Salvou',
            backgroundColor: 'rgba(255, 94, 129, 0.35)',
            borderColor: 'rgba(255, 94, 129, 1)',
            data: [],
            borderWidth: 1.5

        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsHoje.push(registro.hrCurtida);
        dadosHoje.datasets[0].data.push(registro.qtdCurtida);
        dadosHoje.datasets[1].data.push(registro.qtdSalvo);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labelsHoje)
    console.log('Dados:')
    console.log(dadosHoje.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const configHoje = {
        type: 'line',
        data: dadosHoje,
        options: {
            scales:{
                x: {
                    grid:{
                        drawOnChartArea: false
                    }
                },
                y: {
                    grid:{
                        drawOnChartArea: false
                    }
                },
                
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#161616',
                        font: {
                            size: 14,
                            family: 'Poppins',
                            weight: 300
                        }
                    }
                }
            }
        }     
    }

    // Adicionando gráfico criado em div na tela
    let chartHoje = new Chart(
        document.getElementById(`chartHoje`),
        configHoje
    );

    // setTimeout(() => atualizarGraficoLinha(dadosHoje, chartHoje), 2000);
}

function plotarGraficoBarra(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labelsAno = [];

    let dadosAno = {
        labels: mesAno,
        datasets: [{
            label: 'Curtiu',
            backgroundColor: 'rgba(112, 61, 87, 0.35)',
            borderColor: 'rgba(112, 61, 87, 1)',
            data: [],
            borderWidth: 1.5

        },
        {
            label: 'Salvou',
            backgroundColor: 'rgba(255, 94, 129, 0.35)',
            borderColor: 'rgba(255, 94, 129, 1)',
            data: [],
            borderWidth: 1.5

        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dadosAno.datasets[0].data.push(registro.qtdCurtida);
        dadosAno.datasets[1].data.push(registro.qtdSalvo);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labelsAno)
    console.log('Dados:')
    console.log(dadosAno.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const configAno = {
        type: 'bar',
        data: dadosAno,
        options: {
            scales:{
                x: {
                    grid:{
                        drawOnChartArea: false
                    }
                },
                y: {
                    grid:{
                        drawOnChartArea: false
                    }
                },
                
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#161616',
                        font: {
                            size: 14,
                            family: 'Poppins',
                            weight: 300
                        }
                    }
                }
            }
        }     
    }

    // Adicionando gráfico criado em div na tela
    let chartAno = new Chart(
        document.getElementById(`chartAno`),
        configAno
    );

    // setTimeout(() => atualizarGrafico(dadosAno, chartAno), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
// function atualizarGrafico(dados, chartAno) {
//     fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (novoRegistro) {

//                 obterdados();
//                 // alertar(novoRegistro, idAquario);
//                 console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
//                 console.log(`Dados atuais do gráfico:`);
//                 console.log(dados);

//                 let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
//                 avisoCaptura.innerHTML = ""


//                 if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
//                     console.log("---------------------------------------------------------------")
//                     console.log("Como não há dados novos para captura, o gráfico não atualizará.")
//                     avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
//                     console.log("Horário do novo dado capturado:")
//                     console.log(novoRegistro[0].momento_grafico)
//                     console.log("Horário do último dado capturado:")
//                     console.log(dados.labels[dados.labels.length - 1])
//                     console.log("---------------------------------------------------------------")
//                 } else {
//                     // tirando e colocando valores no gráfico
//                     dados.labels.shift(); // apagar o primeiro
//                     dados.labels.push(novoRegistro[0].dtCurtida); // incluir um novo momento

//                     dados.datasets[0].data.shift();  // apagar o primeiro de umidade
//                     dados.datasets[0].data.push(novoRegistro[0].dtCurtida); // incluir uma nova medida de umidade

//                     // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
//                     // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

//                     chartAno.update();
//                 }

//                 // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//                 proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, chartAno), 2000);
//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//             // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//             proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, chartAno), 2000);
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

