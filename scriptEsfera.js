var elemento = document.getElementById("esfera");
var contenedor = document.querySelector(".contenedor");
var radio = 25;

var limiteSuperior = contenedor.clientTop + radio;
var limiteInferior = contenedor.clientHeight - radio;
var limiteIzquierdo = contenedor.clientLeft + radio;
var limiteDerecho = contenedor.clientWidth - radio;


var y = contenedor.clientHeight / 2;
var x = contenedor.clientWidth / 2;
var movimientoY = 0;
var movimientoX = 0;

document.addEventListener('keydown', function(event) {
  var tecla = event.key;
  

  if (tecla === "ArrowUp") {
    event.preventDefault();
    movimientoY = -2;
  } else if (tecla === "ArrowDown") {
    event.preventDefault();
    movimientoY = 2;
  } else if (tecla === "ArrowLeft") {
    event.preventDefault();
    movimientoX = -2;
  } else if (tecla === "ArrowRight") {
    event.preventDefault();
    movimientoX = 2;
  }

  moverEsfera();
});
document.addEventListener('keyup', function(event) {
  var tecla = event.key;
   
  if (tecla === "ArrowUp" || tecla === "ArrowDown") {
    movimientoY = 0;
  } else if (tecla === "ArrowLeft" || tecla === "ArrowRight") {
    movimientoX = 0;
  }
});

function moverEsfera() {
  var nuevaY = y + movimientoY;
  var nuevaX = x + movimientoX;

  // Verificar límites verticales
  if (nuevaY < limiteSuperior) {
    y = limiteSuperior;
  } else if (nuevaY > limiteInferior) {
    y = limiteInferior;
  } else {
    y = nuevaY;
  }

  // Verificar límites horizontales
  if (nuevaX < limiteIzquierdo) {
    x = limiteIzquierdo;
  } else if (nuevaX > limiteDerecho) {
    x = limiteDerecho;
  } else {
    x = nuevaX;
  }

  elemento.style.position = 'relative';
  elemento.style.left = x + "px";
  elemento.style.top = y + "px";
  
  if (movimientoY !== 0 || movimientoX !== 0) {
    requestAnimationFrame(moverEsfera);
  }
}
