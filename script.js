const tableroElemento = document.getElementById('tablero');
const celdas = document.querySelectorAll('.celda');
const textoEstado = document.getElementById('jugador-actual');
const botonReiniciar = document.getElementById('boton-reiniciar');

let jugadorActual = "X";
let estadoJuego = ["", "", "", "", "", "", "", "", ""];
let juegoActivo = true;

const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];

function manejarClickCelda(evento) {
    const celdaClickeada = evento.target;
    const indiceClickeado = parseInt(celdaClickeada.getAttribute('data-indice'));

    if (estadoJuego[indiceClickeado] !== "" || !juegoActivo) {
        return;
    }

    actualizarCelda(celdaClickeada, indiceClickeado);
    validarResultado();
}

function actualizarCelda(celda, indice) {
    estadoJuego[indice] = jugadorActual;
    celda.innerText = jugadorActual;
    celda.classList.add(jugadorActual.toLowerCase());
}

function validarResultado() {
    let rondaGanada = false;

    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const condicion = combinacionesGanadoras[i];
        let a = estadoJuego[condicion[0]];
        let b = estadoJuego[condicion[1]];
        let c = estadoJuego[condicion[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            rondaGanada = true;
            break;
        }
    }

    if (rondaGanada) {
        textoEstado.innerText = `¡Victoria para ${jugadorActual}! 🎉`;
        juegoActivo = false;
        return;
    }

    let empate = !estadoJuego.includes("");
    if (empate) {
        textoEstado.innerText = "¡Empate! 🤝";
        juegoActivo = false;
        return;
    }

    jugadorActual = jugadorActual === "X" ? "O" : "X";
    textoEstado.innerText = jugadorActual;
}

function reiniciarJuego() {
    jugadorActual = "X";
    estadoJuego = ["", "", "", "", "", "", "", "", ""];
    juegoActivo = true;
    textoEstado.innerText = jugadorActual;
    celdas.forEach(celda => {
        celda.innerText = "";
        celda.classList.remove('x', 'o');
    });
}

celdas.forEach(celda => celda.addEventListener('click', manejarClickCelda));
botonReiniciar.addEventListener('click', reiniciarJuego);