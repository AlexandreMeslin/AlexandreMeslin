"use strict";

/*
JSDoc: https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
JSDoc: https://jsdoc.app/
*/

/** quantidade de acertos */
var acertos;
acertos = 0;

/** quantidade de toupeiras perdidas */
var perdidos = 0;

/** quantidade de marteladas erradas */
var errados = 0;

/** timer que controla o tempo da toupeira fora do buraco */
var timer = null;

/** tempo entre cada toupeira sair do buraco */
var intervalo = 5000;

/** tempo que a toupeira fica fora do buraco */
var janela = 2000;

onload = function () {
    for (var i = 0; i < 5; i++) {
        document.getElementById('buraco' + i).addEventListener('click', martelada);
    }
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('start').addEventListener('click', start);
};

/**
 * Sobe uma toupeira
 * Remove o evento do botão start
 */
function start() {
    var botao = document.getElementById('start')

    botao.removeEventListener('click', start);
    botao.disable = true;
    sobeToupeira();
}

/**
 * Coloca a toupeira para fora do buraco.
 * Recalcula o tempo que a toupeira fica fora do buraco.
 * @fires remover a toupeira
 * @fires próximo evento.
 */
function sobeToupeira() {
    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

/**
 * Remove a toupeira de um buraco
 * 
 * @param {int} buraco número do buraco onde está a toupeira
 */
function tiraToupeira(buraco) {
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole.png';
    perdidos++;
    mostraPontuacao();
}

/**
 * Trata o evento de uma martelada, ou seja, um click do mouse sobre o gramado.
 * Ao final da martelada, exibe a pontuação atualizada.
 * 
 * @listens event:click
 * @param {event} evento 
 */
function martelada(evento) {
    if (evento.target.src.includes('hole-mole')) {
        // acertou
        acertos++;
        evento.target.src = 'images/hole.png';
        clearTimeout(timer);
    }
    else {
        // errou
        errados++;
    }
    mostraPontuacao();
}

/**
 * Coloca o martelo para baixo.
 */
function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(images/hammerDown.png), default';
}

/**
 * Coloca o martelo para cima.
 */
function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(images/hammer.png), default';
}

/**
 * Mostra a pontuação no display de 16 segmentos.
 * A função calcula e exibe o saldo.
 */
function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

/**
 * Mostra um valor no display.
 * 
 * @param {object image} display imagens com display de 16 segmentos
 * @param {int} valor valor a ser exibido com até 3 dígitos
 */
function mostraPontuacaoDe(display, valor) {
    let centena = document.getElementById(display).firstChild;
    centena.src = 'images/caractere_' + parseInt(valor/100) + '.gif';
    centena.alt = parseInt(valor/100);
    let dezena = centena.nextSibling;
    dezena.src = 'images/caractere_' + parseInt((valor/10)%10) + '.gif';
    dezena.alt = parseInt((valor/10)%10);
    let unidade = dezena.nextSibling;
    unidade.src = 'images/caractere_' + (valor % 10) + '.gif';
    unidade.alt = valor % 10;
}
