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



function obterDadosGraficoLinha() {
    var registrosInteracaoHoje = [];
    var dataAtual = new Date;
    var horaAtual = dataAtual.getHours();
    
    for (var contadorHora = horaAtual - 7; contadorHora <= horaAtual; contadorHora++) {
        if(contadorHora < 10){
            var a = "0" + contadorHora;
            contadorHora = a;
            console.log(a)
        }

        fetch(`/analytics/buscarInteracaoHoje/${fkUsuario}/${contadorHora}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        registrosInteracaoHoje.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });
    }

    setTimeout(() => {plotarGraficoLinha(registrosInteracaoHoje)}, 200);
}

function obterDadosGraficoBarra() {
    var registrosInteracaoAno = [];
    var mesAtual = dataAtual.getMonth();

    for (var contadorMes = 1; contadorMes <= mesAtual + 1; contadorMes++) {
        fetch(`/analytics/buscarInteracaoAno/${fkUsuario}/${contadorMes}`)
            .then(resposta => {
                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log(resposta)
                        registrosInteracaoAno.push(resposta[0]);
                    })
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
            });
    }

    setTimeout(() => {plotarGraficoBarra(registrosInteracaoAno)}, 200);
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
    var mesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto']
    var mesAtual = dataAtual.getMonth() + 1;
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labelsAno = [];

    for(var contadorMes = 0; contadorMes < mesAtual; contadorMes++){
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

}

window.onload = setTimeout(() => {
    obterDados();
    obterDadosGraficoLinha();
    obterDadosGraficoBarra();
}, 100)
