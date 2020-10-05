class Pregunta {
  constructor(preguntas, preguntaSeleccionada) {
    this.pregunta = preguntas[preguntaSeleccionada];
    this.modal =
      `<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="modalTitle">` +
      preguntaSeleccionada +
      `</h5>
                          <button type="button" class="close quitar-modal" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="container-fluid">
                            <div class="row">
                              <div class="col-12">
                                <p class="font-weight-bold">` +
      this.pregunta.pregunta +
      `</p>
                              </div>
                              <div class="col-3">
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="radio1" name="radio" class="custom-control-input" value="` +
      this.pregunta.respuestas[1] +
      `">
                                  <label class="custom-control-label" for="radio1">` +
      this.pregunta.respuestas[1] +
      `</label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="radio2" name="radio" class="custom-control-input" value="` +
      this.pregunta.respuestas[2] +
      `">
                                  <label class="custom-control-label" for="radio2">` +
      this.pregunta.respuestas[2] +
      `</label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="radio3" name="radio" class="custom-control-input" value="` +
      this.pregunta.respuestas[3] +
      `">
                                  <label class="custom-control-label" for="radio3">` +
      this.pregunta.respuestas[3] +
      `</label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="radio4" name="radio" class="custom-control-input" value="` +
      this.pregunta.respuestas[4] +
      `">
                                  <label class="custom-control-label" for="radio4">` +
      this.pregunta.respuestas[4] +
      `</label>
                                </div>
                              </div>
                              <div class="col-12 mt-4" id="alerta">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger quitar-modal" data-dismiss="modal">Cerrar</button>
                          <button id="boton-verificar-res" type="button" class="btn btn-success">Verificar respuesta</button>
                        </div>
                      </div>
                    </div>
                  </div>`;

    this.alertaCorrecta = `<div class="alert alert-success" role="alert">
                            ¡Respuesta CORRECTA: sigue estudiando así!
                          </div>`;

    this.alertaIncorrecta = `<div class="alert alert-danger" role="alert">
                              ¡Respuesta INCORRECTA: debes estudiar más!
                            </div>`;

    this.imgJuegoGanado = `<img src="icons/checked.svg" alt="1">`;

    this.imgJuegoPerdido = `<img src="icons/cancel.svg" alt="0">`;

    this.dataModalJuego = {
      titulo: "",
      mensaje: ""
    };

    this.modalJuego = "";
  }

  mostrarModal() {
    $(".container").append(this.modal);
    $("#modal")
      .modal({
        backdrop: "static"
      })
      .modal("show");
    this.verificar();
  }

  ocultarModal() {
    setTimeout(function () {
      $("#modal").modal("hide");
    }, 2000);
  }

  removerModal() {
    $("#modal").remove();
  }

  setModalJuego() {
    this.modalJuego =
      `<div class="modal fade" id="modalJuego" tabindex="-1" role="dialog" aria-labelledby="modalJuegoLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="modalJuegoLabel">` +
      this.dataModalJuego.titulo +
      `</h5>
                            </div>
                            <div class="modal-body">
                              <p>` +
      this.dataModalJuego.mensaje +
      `</p>
                            </div>
                            <div class="modal-footer">
                              <button id="aceptar" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                            </div>
                          </div>
                        </div>
                      </div>`;
  }

  mostrarModalJuego() {
    let pregunta = this;
    this.removerModalJuego();
    if (this.jugadorGano()) {
      this.dataModalJuego.titulo = `<div class="alert alert-success" role="alert">¡Ganaste!</div>`;
      this.dataModalJuego.mensaje = `¡Bien hecho pasaste la prueba, te ganaste un PREMIO!`;
    } else {
      this.dataModalJuego.titulo = `<div class="alert alert-danger" role="alert">¡Perdiste!</div>`;
      this.dataModalJuego.mensaje = `¡Lo siento no pudiste con la prueba, tienes que ESTUDIAR!`;
    }
    this.setModalJuego();
    $(".container").append(this.modalJuego);
    setTimeout(function () {
      $("#modalJuego")
        .modal({
          backdrop: "static"
        })
        .modal("show");
    }, 2100);
    $("#aceptar").click(function () {
      pregunta.removerImgMarcadores();
    });
  }

  removerModalJuego() {
    $("#modalJuego").remove();
  }

  popoverVacio($boton) {
    $boton.popover({
      placement: "top",
      title: "¡Alerta!",
      content: "¡Elija una respuesta!"
    });
    $boton.popover("show");
    setTimeout(function () {
      $boton.popover("dispose");
    }, 750);
  }

  jugadorGano() {
    let b = true;
    $(".marca-juego")
      .children()
      .each(function (index, elem) {
        let $elem = $(this);
        if ($elem[0].alt == "0") {
          b = false;
          return false;
        }
      });
    return b;
  }

  removerImgMarcadores() {
    let $divsMarcaJuego = $(".marca-juego");
    $divsMarcaJuego.children().remove();
  }

  verificarRespuesta(respuesta, $boton) {
    var pregunta = this;
    let $divAlerta = $("#alerta");
    let $divsMarcaJuego = $(".marca-juego");
    $divAlerta.children().remove();
    if (respuesta == this.pregunta.respuestaCorrecta) {
      $divAlerta.append(this.alertaCorrecta);
      $divsMarcaJuego.each(function (index, elem) {
        let $elem = $(elem);
        if (!$elem.children().length) {
          let audioCorrecto = new Audio("audio/correcto.mp3");
          audioCorrecto.play();
          $elem.append(pregunta.imgJuegoGanado);
          return false;
        }
      });
    } else {
      $divAlerta.append(this.alertaIncorrecta);
      $divsMarcaJuego.each(function (index, elem) {
        let $elem = $(elem);
        if (!$elem.children().length) {
          let audioIncorrecto = new Audio("audio/incorrecto.mp3");
          audioIncorrecto.play();
          $elem.append(pregunta.imgJuegoPerdido);
          return false;
        }
      });
    }
    if ($divsMarcaJuego.children().length == 3) {
      pregunta.mostrarModalJuego();
    }
    $boton.attr("disabled", true);
    $("input[name=radio]").each(function (index, elem) {
      let $elem = $(elem);
      $elem.attr("disabled", true);
    });
  }

  seleccionado() {
    let b = false;
    let r = "";
    $("input[name=radio]").each(function (index, elem) {
      if (elem.checked) {
        b = true;
        r = elem.value;
        return false;
      }
    });
    return [b, r];
  }

  verificar() {
    let pregunta = this;
    let $boton = $("#boton-verificar-res");
    $boton.on("click", function () {
      let selec = pregunta.seleccionado();
      if (!selec[0]) {
        pregunta.popoverVacio($boton);
      } else {
        pregunta.verificarRespuesta(selec[1], $boton);
        pregunta.ocultarModal();
      }
    });
  }
}
