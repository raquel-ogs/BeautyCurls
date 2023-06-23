var fkUsuario = sessionStorage.ID;
var qtdInteracaoUsuario = 0;
var qtdPosts = 0;
var dataAtual = new Date;

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

                    if (qtdVisitas <= 1) {
                        qtdPostVisitado.innerHTML += " post"
                    } else {
                        qtdPostVisitado.innerHTML += " posts";
                    }
                })
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

                    if (qtdCurtidos <= 1) {
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

                    if (qtdSalvos <= 1) {
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



function obterDadosGraficoLinha() {
    var registrosCurtidas = [];
    var registrosSalvos = [];
    var dataAtual = new Date;
    var horaAtual = dataAtual.getHours();
    var limiteRegistro = 0;

    if(horaAtual < 7){
        limiteRegistro = horaAtual;
    } else {
        limiteRegistro = horaAtual - 7;
    }

    for (var contadorHora = limiteRegistro; contadorHora <= horaAtual; contadorHora++) {
        if (contadorHora < 10) {
            var horaCom0 = "0" + contadorHora;
            contadorHora = horaCom0;
        }

        fetch(`/analytics/buscarCurtidaHoje/${fkUsuario}/${contadorHora}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        registrosCurtidas.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });

        fetch(`/analytics/buscarSalvoHoje/${fkUsuario}/${contadorHora}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        registrosSalvos.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });
    }

    setTimeout(() => { plotarGraficoLinha(registrosCurtidas, registrosSalvos) }, 200);
}

function obterDadosGraficoBarra() {
    var registrosCurtidas = [];
    var registrosSalvos = [];
    var mesAtual = dataAtual.getMonth();

    for (var contadorMes = 1; contadorMes <= mesAtual + 1; contadorMes++) {
        fetch(`/analytics/buscarCurtidaMes/${fkUsuario}/${contadorMes}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        registrosCurtidas.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });
        
            fetch(`/analytics/buscarSalvoMes/${fkUsuario}/${contadorMes}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        registrosSalvos.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });
    }   

    setTimeout(() => { plotarGraficoBarra(registrosCurtidas, registrosSalvos) }, 200);
}

function plotarGraficoLinha(respostaCurtida, respostaSalvo) {

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
    console.log(respostaCurtida)

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(respostaSalvo)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < respostaCurtida.length; i++) {
        var registroCurtida = respostaCurtida[i];
        labelsHoje.push(registroCurtida.hrCurtida);
        dadosHoje.datasets[0].data.push(registroCurtida.qtdCurtida);
    }

    for (i = 0; i < respostaSalvo.length; i++) {
        var registroSalvo = respostaSalvo[i];
        dadosHoje.datasets[1].data.push(registroSalvo.qtdSalvo);
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
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    grid: {
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

function plotarGraficoBarra(respostaCurtida, respostaSalvo) {
    var mesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto']
    var mesAtual = dataAtual.getMonth() + 1;
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labelsAno = [];

    for (var contadorMes = 0; contadorMes < mesAtual; contadorMes++) {
        var itemMesAtual = mesAno[contadorMes];
        labelsAno.push(itemMesAtual);
    }

    let dadosAno = {
        labels: labelsAno,
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
    console.log(respostaCurtida)
    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(respostaSalvo)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (var i = 0; i < respostaCurtida.length; i++) {
        var registroCurtida = respostaCurtida[i];
        dadosAno.datasets[0].data.push(registroCurtida.qtdCurtida);
    }

    for (var i = 0; i < respostaSalvo.length; i++) {
        var registroSalvo = respostaSalvo[i];
        console.log("Dados dos Salvo: " + registroSalvo.qtdSalvo)
        dadosAno.datasets[1].data.push(registroSalvo.qtdSalvo);
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
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    grid: {
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

}

window.onload = setTimeout(() => {
    obterDados();
    obterDadosGraficoLinha();
    obterDadosGraficoBarra();
}, 500)
