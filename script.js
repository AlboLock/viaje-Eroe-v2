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

document.addEventListener('click', function(event){
    if (event.target.classList.contains('personaje'))
        personajeActivo = document.getElementById(event.target.id);
})

document.addEventListener('keydown', function(event){
    switch (event.key){
        case 'ArrowUp':
            movimiento('Up');
            break;
        case 'ArrowDown':
            movimiento('Down');
            break;
        case 'ArrowLeft':
            movimiento('Left');
            break;
        case 'ArrowRight':
            movimiento('Right');
            break;
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
