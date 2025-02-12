let container = document.querySelector('.contenedor-principal');
let errorContainer = document.querySelector('.mensaje-error');
let yPantalla = window.innerHeight;
let xPantalla = window.innerWidth;
let anchoPers = 54;
let altPers = 90;

let statsScream = [];
statsScream.x = 0;
statsScream.y = 0;
statsScream.spawned = false;
statsScream.name = 'scream';

let statsFreddy = [];
statsFreddy.x = 0;
statsFreddy.y = 0;
statsFreddy.spawned = false;
statsFreddy.name = 'freddy';

let statsLecter = [];
statsLecter.x = 0;
statsLecter.y = 0;
statsLecter.spawned = false;
statsLecter.name = 'lecter';

let statsHell = [];
statsHell.x = 0;
statsHell.y = 0;
statsHell.spawned = false;
statsHell.name = 'hell';

let personajes = [
    statsScream,
    statsFreddy,
    statsLecter,
    statsHell
];

let personajeActivo;
let isArrowUpPress = false;
let isArrowDownPress = false;
let isArrowLeftPress = false;
let isArrowRightPress = false;
let intervalIdY;
let intervalIdX;
let delay = 25;
let screamDelay = 25;
let freddyDelay = 40;
let lecterDelay = 50;
let hellDelay = 60;


document.addEventListener('click', function(event){
    if (event.target.classList.contains('personaje')){
        if (event.target.id != personajeActivo.id){
            personajeActivo.classList.remove('personajeAct');
            event.target.classList.add('personajeAct');
            personajeActivo = document.getElementById(event.target.id);
        }
        switch (personajeActivo.id) {
            case 'scream':
                delay = screamDelay;
                break;
            case 'freddy':
                delay = freddyDelay;
            case 'hell':
                delay = hellDelay;
            case 'lecter':
                delay = lecterDelay;
        }
    }
})

document.addEventListener('keydown', function(event){
    switch (event.key) {
        case 'ArrowUp':
            if (!isArrowUpPress){
                if (isArrowDownPress){
                    isArrowDownPress = false;
                    clearInterval(intervalIdY);
                }
                isArrowUpPress = true;
                intervalIdY = setInterval(movimiento, delay, 'Up');
            }
            break;
        case 'ArrowDown':
            if (!isArrowDownPress){
                if (isArrowUpPress){
                    isArrowUpPress = false;
                    clearInterval(intervalIdY);
                }
                isArrowDownPress = true;
                intervalIdY = setInterval(movimiento, delay, 'Down');
            }
            break;
        case 'ArrowLeft':
            if (!isArrowLeftPress){
                if (isArrowRightPress){
                    isArrowRightPress = false;
                    clearInterval(intervalIdX);
                }
                isArrowLeftPress = true;
                intervalIdX = setInterval(movimiento, delay, 'Left');
            }
            break;
            
        case 'ArrowRight':
            if (!isArrowRightPress){
                if (isArrowLeftPress){
                    isArrowLeftPress = false;
                    clearInterval(intervalIdX);
                }
                isArrowRightPress = true;
                intervalIdX = setInterval(movimiento, delay, 'Right');
            }
            break;
    }
})

document.addEventListener('keyup', function(event){
    switch (event.key) {
        case 'ArrowUp':
            if (isArrowUpPress){
                isArrowUpPress = false;
                clearInterval(intervalIdY);
            }
            break;
        case 'ArrowDown':
            if (isArrowDownPress){
                isArrowDownPress = false;
                clearInterval(intervalIdY);
            }
            break;
        case 'ArrowLeft':
            if (isArrowLeftPress){
                isArrowLeftPress = false;
                clearInterval(intervalIdX);
            }
            break;
        case 'ArrowRight':
            if (isArrowRightPress){
                isArrowRightPress = false;
                clearInterval(intervalIdX);
            }
            break;
    }
})

function getRandomPositions() {
    for (let i = 0; i < personajes.length; i++) {
        let randomX;
        let randomY;
        let overlap;
        do {
            randomX = Math.random() * (xPantalla - anchoPers);
            randomY = Math.random() * (yPantalla - altPers);
            overlap = false;
            for (let j = 0; j < i; j++) {
                let other = personajes[j];
                if (Math.abs(randomX - other.x) < anchoPers && Math.abs(randomY - other.y) < altPers) {
                    overlap = true;
                    break;
                }
            }
        } while (overlap);
        personajes[i].x = randomX;
        personajes[i].y = randomY;
    }
    console.log(personajes);
}

function spawnPersonaje(){
    let yPantalla = container.clientHeight;
    let xPantalla = container.clientWidth;
    for (let i=0; i<personajes.length; i++){
        if (personajes[i].spawned == false){
            let randomX = Math.random() * (xPantalla - anchoPers);
            let randomY = Math.random() * (yPantalla - altPers);
            let overlap = false;
            for (let j=0; j<i; j++) {
                if (Math.abs(randomX - personajes[j].x) < anchoPers && Math.abs(randomY - personajes[j].y) < altPers) {
                    overlap = true;
                    break;
                }
            }
            if (!overlap){
                personajes[i].x = randomX;
                personajes[i].y = randomY;
                const div = document.createElement('div');
                div.classList.add('personaje');
                div.id = personajes[i].name;
                div.style.left = personajes[i].x + 'px';
                div.style.top = personajes[i].y + 'px';
                div.style.backgroundImage = `url(GIf/c${i}stp.png)`
                if (i == 0) {
                    personajeActivo = div;
                    div.classList.add('personajeAct');
                }
                container.appendChild(div);
                personajes[i].spawned = true;
                break;
            } else {
                errorContainer.style.display = 'flex';
                document.getElementById('mensajeError').innerHTML = 'Personaje solapado, inténtalo de nuevo'
                return;
            }
        }
    }
}

function movimiento(direccion){
    let posicionYActual = parseFloat(personajeActivo.style.top);
    console.log(posicionYActual)
    let posicionXActual = parseFloat(personajeActivo.style.left);
    let distancia = 5
    switch (direccion){
        case 'Up':
            if (posicionYActual > 0)
                posicionYActual -= distancia;
                personajeActivo.style.top = posicionYActual + 'px';
            break;
        case 'Down':
            if (posicionYActual + distancia <= yPantalla - altPers)
                posicionYActual += distancia;
                personajeActivo.style.top = posicionYActual + 'px';
            break;
        case 'Left':
            if (posicionXActual > 0)
                posicionXActual -= distancia;
                personajeActivo.style.left = posicionXActual + 'px';
            break;
        case 'Right':
            if (posicionXActual + distancia <= xPantalla - anchoPers)
                posicionXActual += distancia;
                personajeActivo.style.left = posicionXActual + 'px';
            break;
    }
}
function start() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('bk').style.display = 'block';
    getRandomPositions();
    spawnPersonaje();
}

function cambiarFondo(){
document.querySelector('.contenedor-principal').style.backgroundImage="url('img/bg01.png')";
}

function cambiarFondo2(){
document.querySelector('.contenedor-principal').style.backgroundImage = "url('img/bg2.png')";
}