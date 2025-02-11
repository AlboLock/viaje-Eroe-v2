let container = document.querySelector('.contenedor-principal');
let anchoPers = 50;
let altPers = 50;
let personajes = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
]
let personajeActivo;
let isMoving = false;
let intervalsIds = [];

document.addEventListener('click', function(event){
    if (event.target.classList.contains('personaje'))
        personajeActivo = document.getElementById(event.target.id);
})

document.addEventListener('keydown', function(event){
    let intervalId;
    if (!isMoving){
        isMoving = true;
        switch (event.key) {
            case 'ArrowUp':
                intervalId = setInterval(movimiento, 25, 'Up');
                intervalsIds.push(intervalId);
                break;
            case 'ArrowDown':
                intervalId = setInterval(movimiento, 25, 'Down');
                intervalsIds.push(intervalId);
                break;
            case 'ArrowLeft':
                intervalId = setInterval(movimiento, 25, 'Left');
                intervalsIds.push(intervalId);
                break;
            case 'ArrowRight':
                intervalId = setInterval(movimiento, 25, 'Right');
                intervalsIds.push(intervalId);
                break;
        }
    }
})

document.addEventListener('keyup', function(event){
    isMoving = false;
    for (let i=0; i<intervalsIds.length; i++){
        clearInterval(intervalsIds[i]);
    }
})

function getRandomPositions() {
    let yPantalla = container.clientHeight;
    let xPantalla = container.clientWidth;
    for (let i=0; i<personajes.length; i++){
        let randomX = Math.random() * (xPantalla - anchoPers);
        let randomY = Math.random() * (yPantalla - altPers);
        personajes[i].x = randomX;
        personajes[i].y = randomY;
    }
    console.log(personajes)
}

function spawnPersonajes(){
    container.innerHTML = '';
    for (let i=0; i<personajes.length; i++){
        const div = document.createElement('div');
        div.classList.add('personaje');
        div.id = i;
        div.style.left = personajes[i].x + 'px';
        div.style.top = personajes[i].y + 'px';
        div.style.backgroundImage = `url(img/c${i}.gif)`
        container.appendChild(div);
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
    spawnPersonajes();
}
