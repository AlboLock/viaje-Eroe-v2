let container = document.querySelector('.contenedor-principal');
let anchoPers = 120;
let altPers = 120;
let personajes = [
    {name: 'scream', x: 0, y: 0, spawned: false},
    {name: 'freddy', x: 0, y: 0, spawned: false},
    {name: 'lecter', x: 0, y: 0, spawned: false},
    {name: 'hell', x: 0, y: 0, spawned: false}
];
let personajeActivo;
let isArrowUpPress = false;
let isArrowDownPress = false;
let isArrowLeftPress = false;
let isArrowRightPress = false;
let intervalIdY;
let intervalIdX;
let delay = 0;
let screamDelay = 25;
let freddyDelay = 40;
let lecterDelay = 50;
let hellDelay = 60;


document.addEventListener('click', function(event){
    if (event.target.classList.contains('personaje'))
        personajeActivo = document.getElementById(event.target.id);
      /* let cambio=personajeActivo.classList.add("personajeAct");*/
        switch (event.target.id){
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
    let yPantalla = container.clientHeight;
    let xPantalla = container.clientWidth;
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
    for (let i=0; i<personajes.length; i++){
        if (personajes[i].spawned == false){
            const div = document.createElement('div');
            div.classList.add('personaje');
            div.id = personajes[i].name;
            div.style.left = personajes[i].x + 'px';
            div.style.top = personajes[i].y + 'px';
            div.style.backgroundImage = `url(img/c${i}.gif)`
            container.appendChild(div);
            personajes[i].spawned = true;
            break;
        }
        
    }
}

function movimiento(direccion){
    let posicionYActual = parseFloat(personajeActivo.style.top);
    let posicionXActual = parseFloat(personajeActivo.style.left);
    switch (direccion){
        case 'Up':
        posicionYActual -= 5;
        break;
        case 'Down':
        posicionYActual += 5;
        break;
        case 'Left':
        posicionXActual -= 5;
        break;
        case 'Right':
        posicionXActual += 5;
        break;
    }
    personajeActivo.style.top = posicionYActual + 'px';
    personajeActivo.style.left = posicionXActual + 'px';
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