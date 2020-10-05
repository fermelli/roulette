class Ruleta {
  constructor(canvas, preguntas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.preguntas = preguntas;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.cX = this.w / 2;
    this.cY = this.h / 2 + 0.05 * this.h;
    this.radio = this.cX - 0.1 * this.w;
    this.radioInterno = this.cX - 0.33 * this.w;
    this.cantidadPreg = this.cantidadPreguntas();
    this.anguloI = this.anguloInicial();
    this.angulo = this.gradARad(360 / this.cantidadPreg);
    this.datos = this.datosGrafico();
    this.incremento = this.setIncremento();
    this.anguloIndicador = 30;
    this.titulo = {
      texto: "Ruleta Contable"
    };
    this.xIndicador =
      this.cX +
      (this.radio - 25) * Math.cos(this.gradARad(this.anguloIndicador));
    this.yIndicador =
      this.cY -
      (this.radio - 25) * Math.sin(this.gradARad(this.anguloIndicador));
    this.colores = [
      "rgb(160,49,49)",
      "rgb(255,135,135)",
      "rgb(247,131,172)",
      "rgb(218,119,242)",
      "rgb(151,117,250)",
      "rgb(116,143,252)",
      "rgb(77,171,247)",
      "rgb(59,201,219)",
      "rgb(56,217,169)",
      "rgb(105,219,124)",
      "rgb(169,227,75)",
      "rgb(255,212,59)",
      "rgb(255,169,77)",
      "rgb(211,84,0)",
      "rgb(194,124,78)"
    ];
    this.preguntaSeleccionada;
  }

  grafTitulo() {
    this.ctx.font = "bold 50px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "rgb(52,58,64)";
    this.ctx.fillText(this.titulo.texto, this.cX, 0.05 * this.h, 0.8 * this.w);
  }

  cantidadPreguntas() {
    let cont = 0;
    for (const indiceAsoc in this.preguntas) {
      cont++;
    }
    return cont;
  }

  datosGrafico() {
    let anguloI = this.anguloI;
    let datos = [];
    for (const indiceAsoc in this.preguntas) {
      let anguloF = anguloI + this.angulo;
      datos.push([indiceAsoc, this.preguntas[indiceAsoc], anguloI, anguloF]);
      anguloI = anguloF;
    }
    return datos;
  }

  gradARad(angulo) {
    return (angulo * Math.PI) / 180;
  }

  radAGrad(angulo) {
    return (angulo * 180) / Math.PI;
  }

  anguloInicial() {
    return this.gradARad(Math.floor(Math.random() * (350 - 10) + 10));
  }

  grafBoton(color) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.cX, this.cY);
    this.ctx.arc(
      this.cX,
      this.cY,
      this.radioInterno - 20,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.closePath();
    this.ctx.strokeStyle = "rgb(248,249,250)";
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.moveTo(this.cX, this.cY);
    this.ctx.beginPath();
    this.ctx.arc(
      this.cX,
      this.cY,
      this.radioInterno - 40,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.closePath();
    this.ctx.strokeStyle = "rgb(248,249,250)";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.font = "bold 40px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "rgb(248,249,250)";
    this.ctx.fillText("Presiona", this.cX, this.cY, 2 * this.radioInterno - 60);
  }

  porcion(
    indice,
    anguloI,
    anguloF,
    color,
    colorLinea = "rgb(248,249,250)",
    anchoLinea = 3
  ) {
    let x1 = this.radioInterno * Math.cos(anguloI);
    let y1 = this.radioInterno * Math.sin(anguloI);
    let x2 = this.radio * Math.cos(anguloI);
    let y2 = this.radio * Math.sin(anguloI);
    let x4 = this.radioInterno * Math.cos(anguloF);
    let y4 = this.radioInterno * Math.sin(anguloF);
    this.ctx.beginPath();
    this.ctx.strokeStyle = colorLinea;
    this.ctx.lineWidth = anchoLinea;
    this.ctx.moveTo(this.cX + x1, this.cY + y1);
    this.ctx.lineTo(this.cX + x2, this.cY + y2);
    this.ctx.arc(this.cX, this.cY, this.radio, anguloI, anguloF, false);
    this.ctx.lineTo(this.cX + x4, this.cY + y4);
    this.ctx.arc(this.cX, this.cY, this.radioInterno, anguloF, anguloI, true);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    let angulo = (anguloI + anguloF) / 2;
    let radio = this.radioInterno + (this.radio - this.radioInterno) / 2;
    this.ctx.font = "bold 30px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "rgb(248,249,250)";
    this.ctx.fillText(
      indice + 1,
      this.cX + radio * Math.cos(angulo),
      this.cY + radio * Math.sin(angulo),
      80
    );
  }

  grafPorcion() {
    for (let i = 0; i < this.datos.length; i++) {
      this.porcion(i, this.datos[i][2], this.datos[i][3], this.colores[i]);
    }
  }

  limpiarLienzo() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  cambiarDatosGrafico() {
    for (let i = 0; i < this.datos.length; i++) {
      this.datos[i][2] = this.datos[i][2] + this.incremento;
      this.datos[i][3] = this.datos[i][3] + this.incremento;
    }
  }

  grafIndicador(anguloInclinacionIndicador) {
    let anguloInclinacionIndicadorC =
      this.anguloIndicador - anguloInclinacionIndicador;
    let angulo =
      90 - (anguloInclinacionIndicador + 2 * anguloInclinacionIndicadorC);
    let tam = 60;
    this.ctx.beginPath();
    this.ctx.moveTo(this.xIndicador, this.yIndicador);
    this.ctx.lineTo(
      this.xIndicador +
        tam * Math.cos(this.gradARad(anguloInclinacionIndicador)),
      this.yIndicador -
        tam * Math.sin(this.gradARad(anguloInclinacionIndicador))
    );
    this.ctx.lineTo(
      this.xIndicador + tam * Math.sin(this.gradARad(angulo)),
      this.yIndicador - tam * Math.cos(this.gradARad(angulo))
    );
    this.ctx.lineTo(this.xIndicador, this.yIndicador);
    this.ctx.lineWidth = 2;
    this.ctx.closePath();
    this.ctx.strokeStyle = "rgb(248,249,250)";
    this.ctx.fillStyle = "rgb(128,0,0)";
    this.ctx.fill();
    this.ctx.stroke();
  }

  setIncremento() {
    return (this.incremento = Math.random() * (0.385 - 0.25) + 0.25);
  }

  setSeleccionarPregunta() {
    let angulo = this.gradARad(this.anguloIndicador);
    for (let i = 0; i < this.datos.length; i++) {
      console.log(angulo, this.datos[i][2], this.datos[i][3]);
      if (
        Math.cos(angulo) >= Math.cos(this.datos[i][2]) &&
        Math.cos(angulo) < Math.cos(this.datos[i][3])
      ) {
        this.preguntaSeleccionada = this.datos[i][0];
      }
    }
  }

  esBoton(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let dx, dy;
    if (x >= this.cX) {
      dx = x - this.cX;
    } else {
      dx = this.cX - x;
    }
    if (y >= this.cY) {
      dy = y - this.cY;
    } else {
      dy = this.cY - y;
    }
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (d <= this.radioInterno - 20) {
      return true;
    }
    return false;
  }
}
