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
  
  movimientoY = (tecla === "ArrowDown") ? (event.preventDefault(), 2) : (tecla === "ArrowUp") ? (event.preventDefault(), -2) : 0;
  movimientoX = (tecla === "ArrowLeft") ? (event.preventDefault(), -2) : (tecla === "ArrowRight") ? (event.preventDefault(), 2) : 0;

  moverEsfera();
  
});
document.addEventListener('keyup', function(event) {
  var tecla = event.key;
  movimientoY = (tecla === "ArrowUp" || tecla === "ArrowDown") ? 0 : movimientoY;
  movimientoX = (tecla === "ArrowLeft" || tecla === "ArrowRigth") ? 0 : movimientoX;
});

function moverEsfera() {
  var nuevaY = y + movimientoY;
  var nuevaX = x + movimientoX;

  
  y = (nuevaY < limiteSuperior) ? limiteSuperior : (nuevaY > limiteInferior) ?  limiteInferior : nuevaY;
  x = (nuevaX < limiteIzquierdo) ? limiteIzquierdo : (nuevaX > limiteDerecho) ? limiteDerecho : nuevaX; 

  elemento.style.position = 'relative';
  elemento.style.left = x + "px";
  elemento.style.top = y + "px";

 

  (movimientoY !== 0 || movimientoX !== 0 ) ? requestAnimationFrame(moverEsfera) : null;

}

