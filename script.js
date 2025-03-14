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

let frases = [
    "No estás solo",
    "Corre… mientras puedas",
    "¿Oíste eso?",
    "Algo me sigue...",
    "No mires atrás",
    "Está aquí...",
    "Siento frío...",
    "Esto no es real...",
    "No puedo escapar",
    "Susurros… los oyes?",
    "Alguien me observa...",
    "Las sombras se mueven",
    "No cierres los ojos.",
    "La puerta se cerró sola",
    "La sangre sigue fresca...",
    "¿Quién ríe en la oscuridad?",
    "Me encontraron...",
    "Esto no debería estar aquí.",
    "La salida desapareció",
    "Demasiado tarde..."
];

let frasesTemp = frases.slice();

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('personaje')) {
        if (event.target.id !== personajeActivo.id) {
            personajeActivo.classList.remove('personajeAct');
            personajeStp();
            event.target.classList.add('personajeAct');
            personajeActivo = document.getElementById(event.target.id);
            personajeA();
            frasesTemp = frases.slice();
        }
        contenedorFrase.style.display='block';
        lanzarFrase();
        actualizarPosicionFrase(); 
    }

    switch (personajeActivo.id) {
        case 'scream':
            delay = screamDelay;
            break;
        case 'freddy':
            delay = freddyDelay;
            break;
        case 'hell':
            delay = hellDelay;
            break;
        case 'lecter':
            delay = lecterDelay;
            break;
    }
});

let contenedorFrase = document.createElement("div"); 
document.body.appendChild(contenedorFrase); 

function actualizarPosicionFrase() {
    let rect = personajeActivo.getBoundingClientRect();
    contenedorFrase.style.position = "absolute";
    contenedorFrase.style.left = `${rect.left + window.scrollX}px`;
    contenedorFrase.style.top = `${rect.top + window.scrollY - 30}px`; 
    contenedorFrase.style.background = "rgba(0, 0, 0, 0.7)";
    contenedorFrase.style.color = "white";
    contenedorFrase.style.padding = "5px 10px";
    contenedorFrase.style.borderRadius = "5px";
    contenedorFrase.style.fontSize = "14px";
}
function lanzarFrase() {
    let fraseAleatoria = '';
    let nombre = personajeActivo.id;
    let randomNumb;
    for (let i=0; i<personajes.length; i++){
        if (nombre == personajes[i].name){
            if (frasesTemp.length != 0){
                randomNumb = Math.floor(Math.random() * frasesTemp.length);
                fraseAleatoria = frasesTemp[randomNumb];
                frasesTemp.splice(randomNumb, 1);
            } else {
                fraseAleatoria = 'Déjame en paz...'
            }
        }
    }
    contenedorFrase.textContent = fraseAleatoria;
}

document.addEventListener('keydown', function(event){
    contenedorFrase.style.display='none';
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
                    personajeA();
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
    console.log(personajes)
}

function movimiento(direccion){
    let posicionYActual = parseFloat(personajeActivo.style.top);
    let posicionXActual = parseFloat(personajeActivo.style.left);
    let distancia = 5
    let xFutura = posicionXActual;
    let YFutura = posicionYActual;
    switch (direccion){
        case 'Up':
            YFutura -= distancia;
            if (YFutura > 0){
                if (!detectarColision(xFutura, YFutura)) {
                    personajeActivo.style.top = YFutura + 'px';
                    contenedorFrase.style.display = 'none';
                    updateCoordenadas();
                }
            }
            break;
        case 'Down':
            YFutura += distancia;
            if (YFutura + altPers <= yPantalla - 25){
                if (!detectarColision(xFutura, YFutura)) {
                    personajeActivo.style.top = YFutura + 'px';
                    contenedorFrase.style.display = 'none';
                    updateCoordenadas();
                }
            }
                
            break;
        case 'Left':
            xFutura -= distancia;
            if (xFutura > 0){
                if (!detectarColision(xFutura, YFutura)) {
                    personajeActivo.style.left = xFutura + 'px';
                    contenedorFrase.style.display = 'none';
                    updateCoordenadas();
                    personajeIz();
                }
            }
                
            break;
        case 'Right':
            xFutura += distancia;
            if (xFutura + anchoPers <= xPantalla - 25) {
                if (!detectarColision(xFutura, YFutura)) {
                    personajeActivo.style.left = xFutura + 'px';
                    contenedorFrase.style.display = 'none';
                    updateCoordenadas();
                    personajeA();
                }
            }
            break;
    }
}

function updateCoordenadas(){
    for (let i = 0; i < personajes.length; i++) {
        if (personajeActivo.id == personajes[i].name) {
            personajes[i].x = parseFloat(personajeActivo.style.left);
            personajes[i].y = parseFloat(personajeActivo.style.top);
        }
    }
}

function start() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('bk').style.display = 'block';
    r1();
    spawnPersonaje();
}

function cambiarFondo(){
document.querySelector('.contenedor-principal').style.backgroundImage="url('img/bg01.png')";
}

function cambiarFondo2(){
document.querySelector('.contenedor-principal').style.backgroundImage = "url('img/bg2.png')";
}

function personajeA(){
    switch (personajeActivo.id){
        case 'scream': 
        personajeActivo.style.backgroundImage="url(GIf/c0.gif)";
        break;
        case 'freddy':
            personajeActivo.style.backgroundImage="url(GIf/c1.gif)";
        break;
        case 'lecter':
            personajeActivo.style.backgroundImage="url(GIf/c2.gif)"
        break;
        case 'hell':
            personajeActivo.style.backgroundImage="url(GIf/c3.gif)"
    }
}
function personajeStp(){
    switch (personajeActivo.id){
        case 'scream': 
        personajeActivo.style.backgroundImage="url(GIf/c0stp.png)";
        break;
        case 'freddy':
            personajeActivo.style.backgroundImage="url(GIf/c1stp.png)";
        break;
        case 'lecter':
            personajeActivo.style.backgroundImage="url(GIf/c2stp.png)"
        break;
        case 'hell':
            personajeActivo.style.backgroundImage="url(GIf/c3stp.png)"
    }
}

function personajeIz(){
    switch (personajeActivo.id){
        case 'scream': 
        personajeActivo.style.backgroundImage="url(GIf/c0i.gif)";
        break;
        case 'freddy':
            personajeActivo.style.backgroundImage="url(GIf/c1i.gif)";
        break;
        case 'lecter':
            personajeActivo.style.backgroundImage="url(GIf/c2i.gif)"
        break;
        case 'hell':
            personajeActivo.style.backgroundImage="url(GIf/c3i.gif)"
    }
}
let audio = document.getElementById('audio');

function r1() {
    audio.pause();
    audio.src = 'img/helloween.mp3';
    audio.play();
}
function r2() {
    audio.pause();
    audio.src = 'img/psycho.mp3';
    audio.play();
}
function r3() {
    audio.pause();
    audio.src = 'img/xfiles.mp3';
    audio.play();
}
function mute(){
    audio.pause();
}

function detectarColision(persActX, persActY){
    for (let i=0; i<personajes.length; i++){
        if (personajeActivo.id != personajes[i].name){
            if (Math.abs(persActX - personajes[i].x) < anchoPers && Math.abs(persActY - personajes[i].y) < altPers) {
                return true;
            }
        }
    }
    return false;
}