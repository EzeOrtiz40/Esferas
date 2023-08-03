Math.degrees = function (radians) {
  return radians * 180 / Math.PI;
};

const esferaObjeto = {
  elemento: null,
  contenedor: null,
  radio: 30,
  limiteSuperior: null,
  limiteInferior: null,
  limiteIzquierdo: null,
  limiteDerecho: null,
  y: 0,
  x: 0,
  movimientoY: 0,
  movimientoX: 0,
  haTocadoLimite: false,

  iniciar() {
    this.elemento = document.getElementById("esfera");
    this.contenedor = document.querySelector(".contenedor");

    this.limiteSuperior = this.contenedor.clientTop + this.radio;
    this.limiteInferior = this.contenedor.clientHeight - this.radio;
    this.limiteIzquierdo = this.contenedor.clientLeft + this.radio;
    this.limiteDerecho = this.contenedor.clientWidth - this.radio;

    this.y = this.contenedor.clientHeight / 2;
    this.x = this.contenedor.clientWidth / 2;

    // genero un numero aleatorio para arrancar la esfera
    let velocidadCirculo = (a, b) => {
      let randomNumber = 0;
      while (randomNumber === 0) {
        randomNumber = Math.floor(Math.random() * (a * b * 2 + 1)) - a * b;
      }
      return randomNumber;
      
    };

    document.addEventListener('keydown', (event) => {
      const tecla = event.key;

      if (tecla === "Enter" || tecla === " ") {
        event.preventDefault();
        const velocidad = velocidadCirculo(1,3);
        this.movimientoY = velocidad;
        this.movimientoX = velocidad;
      }
    });

    document.addEventListener('keyup', (event) => {
      const tecla = event.key;
      if (tecla === "Enter" || tecla === " ") {
        this.movimientoY = velocidad;
        this.movimientoX = velocidad;
      }
    });

    this.moverEsfera();
  },

  moverEsfera() {
    const nuevaY = this.y + this.movimientoY;
    const nuevaX = this.x + this.movimientoX;
    // capturo el angulo del golpe de la esfera
    const anguloDeRebote = Math.atan2(this.movimientoY, this.movimientoX);
    const anguloEnGrados = Math.degrees(anguloDeRebote);
    // limito la esfera al contenedor
    this.y = (nuevaY < this.limiteSuperior) ? this.limiteSuperior : (nuevaY > this.limiteInferior) ? this.limiteInferior : nuevaY;
    this.x = (nuevaX < this.limiteIzquierdo) ? this.limiteIzquierdo : (nuevaX > this.limiteDerecho) ? this.limiteDerecho : nuevaX;

    if (!this.haTocadoLimite && (nuevaY !== this.y || nuevaX !== this.x)) {
      this.haTocadoLimite = true;

      const anguloIncidencia = Math.atan2(-this.movimientoY, this.movimientoX);
      const anguloDespuesDelRebote = 2 * anguloIncidencia - anguloEnGrados;
      const radianesDespuesDelRebote = Math.radians(anguloDespuesDelRebote);
      this.movimientoY = Math.sin(radianesDespuesDelRebote) * Math.abs(this.movimientoY);
    } else {
      this.haTocadoLimite = false;
    }

    this.elemento.style.position = 'relative';
    this.elemento.style.left = this.x + "px";
    this.elemento.style.top = this.y + "px";

    if (this.movimientoY !== 0 || this.movimientoX !== 0) {
      requestAnimationFrame(this.moverEsfera.bind(this));
    }
  },
};

Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
};





   function crearPaleta(teclaArriba, teclaAbajo){
      return{  
        paletaElemento : null,
        movimientoPaleta : 0,
        velocidad : 1,

        iniciar(paletaId){
          this.paletaElemento = document.getElementById(paletaId);
          
          document.addEventListener('keydown', (event) => {
              const tecla = event.key;
              
              this.movimientoPaleta = (tecla === teclaAbajo) ? this.velocidad : (tecla === teclaArriba) ? - this.velocidad : this.movimientoPaleta;
              this.moverPaleta();
          });

          document.addEventListener('keyup', (event)=>{
              const tecla = event.key;
              this.movimientoPaleta = (tecla === teclaAbajo || tecla === teclaArriba) ? 0 : this.movimientoPaleta;
              this.movimientoPaleta = 0;
          } );
        },

        moverPaleta() {
          const desplazamientoY = this.paletaElemento.offsetTop;
          const nuevaPosPaleta1 = desplazamientoY + this.movimientoPaleta;
    
          const contenedorHeight = this.paletaElemento.parentElement.clientHeight;
          const paletaHeight = this.paletaElemento.clientHeight;
    
          const limiteSuperior = 0;
          const limiteInferior = contenedorHeight - paletaHeight;
    
          if (nuevaPosPaleta1 >= limiteSuperior && nuevaPosPaleta1 <= limiteInferior) {
            this.paletaElemento.style.top = nuevaPosPaleta1 + "px";
          }
    
          requestAnimationFrame(() => this.moverPaleta());
          },
      }    
  };
    esferaObjeto.iniciar();
    const paleta1 = crearPaleta("w", "s");
    const paleta2 = crearPaleta("ArrowUp", "ArrowDown");

    paleta1.iniciar("paleta1");
    paleta2.iniciar("paleta2");

