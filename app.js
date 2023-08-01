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
  
    iniciar() {
      this.elemento = document.getElementById("esfera");
      this.contenedor = document.querySelector(".contenedor");
  
      this.limiteSuperior = this.contenedor.clientTop + this.radio;
      this.limiteInferior = this.contenedor.clientHeight - this.radio;
      this.limiteIzquierdo = this.contenedor.clientLeft + this.radio;
      this.limiteDerecho = this.contenedor.clientWidth - this.radio;
  
      this.y = this.contenedor.clientHeight / 2;
      this.x = this.contenedor.clientWidth / 2;
  
      document.addEventListener('keydown', (event) => {
        const tecla = event.key;
  
        this.movimientoY = (tecla === "ArrowDown") ? (event.preventDefault(), 2) : (tecla === "ArrowUp") ? (event.preventDefault(), -2) : 0;
        this.movimientoX = (tecla === "ArrowLeft") ? (event.preventDefault(), -2) : (tecla === "ArrowRight") ? (event.preventDefault(), 2) : 0;
  
        this.moverEsfera();
      });
  
      document.addEventListener('keyup', (event) => {
        const tecla = event.key;
        this.movimientoY = (tecla === "ArrowUp" || tecla === "ArrowDown") ? 0 : this.movimientoY;
        this.movimientoX = (tecla === "ArrowLeft" || tecla === "ArrowRight") ? 0 : this.movimientoX;
      });
    },
  
    moverEsfera() {
      const nuevaY = this.y + this.movimientoY;
      const nuevaX = this.x + this.movimientoX;
  
      this.y = (nuevaY < this.limiteSuperior) ? this.limiteSuperior : (nuevaY > this.limiteInferior) ?  this.limiteInferior : nuevaY;
      this.x = (nuevaX < this.limiteIzquierdo) ? this.limiteIzquierdo : (nuevaX > this.limiteDerecho) ? this.limiteDerecho : nuevaX; 
  
      this.elemento.style.position = 'relative';
      this.elemento.style.left = this.x + "px";
      this.elemento.style.top = this.y + "px";
  
      if (this.movimientoY !== 0 || this.movimientoX !== 0) {
        requestAnimationFrame(this.moverEsfera.bind(this));
      }
    },
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

              this.movimientoPaleta1 = (tecla === teclaAbajo) ? this.velocidad : (tecla === teclaArriba) ? - this.velocidad : this.movimientoPaleta1;
              this.moverPaleta();
          });

          document.addEventListener('keyup', (event)=>{
              const tecla = event.key;
              this.movimientoPaleta1 = (tecla === teclaAbajo || tecla === teclaArriba) ? 0 : this.movimientoPaleta1;
              this.movimientoPaleta = 0;
          } );
        },

          moverPaleta(){
            const desplazamientoY = this.paletaElemento.offsetTop;
            const nuevaPosPaleta1 = desplazamientoY + this.movimientoPaleta1;

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
  
    const paleta1 = crearPaleta("w", "s");
    const paleta2 = crearPaleta("ArrowUp", "ArrowDown");

    paleta1.iniciar("paleta1");
    paleta2.iniciar("paleta2");