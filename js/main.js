let canvas = document.getElementById("canvas");
let ruleta = new Ruleta(canvas, {
  pregunta1: {
    pregunta: "Las Herramientas utilizadas en la estrategia comercial son:",
    respuestas: {
      1: "OGSM",
      2: "Las 5 P",
      3: "El diagnóstico, diseño e implementación",
      4: "FODA"
    },
    respuestaCorrecta: "Las 5 P"
  },
  pregunta2: {
    pregunta:
      "Se realiza un analisis interno y externo de la empresa, asi mismo se analiza el FODA:",
    respuestas: {
      1: "Diseño",
      2: "Estrategias",
      3: "Diagnóstico",
      4: "Implementacion"
    },
    respuestaCorrecta: "Diagnóstico"
  },
  pregunta3: {
    pregunta:
      "Son las maneras específicas en las que se logran las metas establecidas:",
    respuestas: {
      1: "Plaza",
      2: "Estrategias",
      3: "Métodos",
      4: "Ninguno"
    },
    respuestaCorrecta: "Estrategias"
  },
  pregunta4: {
    pregunta:
      "En esta etapa se organizan las acciones concretas que se deben seguir para que la Estrategia se haga realidad:",
    respuestas: {
      1: "Estrategias",
      2: "Medición de Estrategias",
      3: "Implemntación",
      4: "Diseño"
    },
    respuestaCorrecta: "Medición de Estrategias"
  },
  pregunta5: {
    pregunta:
      "En esta etapa se hacen controles usando indicadores de gestión, los que ayudarán a medir en forma objetiva si la Estrategia es un aporte para el negocio:",
    respuestas: {
      1: "Medición de Estrategias",
      2: "Medición de Resultados",
      3: "Indicadores",
      4: "Ninguno"
    },
    respuestaCorrecta: "Medición de Resultados"
  },
  pregunta6: {
    pregunta:
      "Es un conjunto de características y atributos tangibles (forma, tamaño, color) e intangibles (marca, prestigio):",
    respuestas: {
      1: "Precio",
      2: "Producto",
      3: "Diseño",
      4: "Ninguno"
    },
    respuestaCorrecta: "Producto"
  },
  pregunta7: {
    pregunta: "Las 5P que se usan en la estategias comercial son:",
    respuestas: {
      1: "Precio, Plaza, Promoción, Producto, Postventa",
      2: "Precio, Plaza, Publicidad, Producto, Postcompra",
      3: "Producto, Plaza, Publicidad, Precio, Postventa",
      4: "Ninguno"
    },
    respuestaCorrecta: "Producto, Plaza, Publicidad, Precio, Postventa"
  },
  pregunta8: {
    pregunta:
      "Permite que el público nos conozca, sepa cuáles son nuestros productos, así como sus atributos y ventajas:",
    respuestas: {
      1: "Plaza",
      2: "Publicidad",
      3: "Promoción",
      4: "Ninguno"
    },
    respuestaCorrecta: "Publicidad"
  },
  pregunta9: {
    pregunta:
      "Son el medio por el cual el producto llega desde el productor al consumidor:",
    respuestas: {
      1: "Canales de Comercialización",
      2: "Plaza",
      3: "Publicidad",
      4: "Ninguno"
    },
    respuestaCorrecta: "Plaza"
  },
  pregunta10: {
    pregunta:
      "Para realizar un Diseño de Estrategia Comercial se debe tomar en cuenta:",
    respuestas: {
      1: "Los Objetivos, Metas, Estrategias, Implemnetación",
      2: "Los Objetivos, Metas, Estrategias, Medición de Resultados",
      3: "Los Objetivos, Metas, Estrategias, Medición de Estrategias",
      4: "Ninguno"
    },
    respuestaCorrecta:
      "Los Objetivos, Metas, Estrategias, Medición de Estrategias"
  },
  pregunta11: {
    pregunta:
      "¿Cuántos y cuáles son las etapas para realizar la estrategia comercial?",
    respuestas: {
      1: "Son 4, Precio, Plaza, Producto, Publicidad",
      2: "Son 4, Diagnóstico, Diseño, Implementacion, Medición de resultados",
      3: "Son 4, Objetivo Principal, Metas, Estrategias y Medición de Estrategias",
      4: "Ninguno de los anteriores"
    },
    respuestaCorrecta:
      "Son 4, Diagnóstico, Diseño, Implementacion, Medición de resultados"
  },
  pregunta12: {
    pregunta:
      "Son objetivos parciales que se deben alcanzar para lograr el Objetivo Principal:",
    respuestas: {
      1: "Objetivo General",
      2: "Metas",
      3: "Objetivos específicos",
      4: "Ninguno"
    },
    respuestaCorrecta: "Metas"
  },
  pregunta13: {
    pregunta:
      "Es el Plan para llevar los productos al mercado y que sigan comercializándose en el tiempo:",
    respuestas: {
      1: "Plaza",
      2: "Estrategia Comercial",
      3: "Comercialización",
      4: "Ninguno"
    },
    respuestaCorrecta: "Estrategia Comercial"
  },
  pregunta14: {
    pregunta:
      "En esta etapa se hacen controles usando indicadores de gestión, los que ayudarán a medir en forma objetiva si la Estrategia es un aporte para el negocio:",
    respuestas: {
      1: "Medición de Resultados",
      2: "Medición de Estrategias",
      3: "Medición de Metas",
      4: "Ninguno"
    },
    respuestaCorrecta: "Medición de Resultados"
  },
  pregunta15: {
    pregunta:
      "Permite que el público nos conozca, sepa cuáles son nuestros productos, así como sus atributos y ventajas, es:",
    respuestas: {
      1: "Promoción",
      2: "Plaza",
      3: "Publicidad",
      4: "Ninguno"
    },
    respuestaCorrecta: "Publicidad"
  }
});
ruleta.grafTitulo();
ruleta.grafBoton("rgb(52,73,94)");
ruleta.grafPorcion();
ruleta.grafIndicador(-10);
canvas.addEventListener("click", function (event) {
  clickBoton(ruleta, event);
});
var band = true;
let clickBoton = function (ruleta, event) {
  if (ruleta.esBoton(event) && band == true) {
    let audio = new Audio("audio/ruleta.mp3");
    audio.play();
    band = false;
    audio.play();
    let intervalo = setInterval(function () {
      ruleta.limpiarLienzo();
      ruleta.grafTitulo();
      ruleta.grafBoton("rgb(52,73,94)");
      ruleta.grafPorcion();
      ruleta.cambiarDatosGrafico();
      ruleta.grafIndicador(-20);
      if (ruleta.incremento > 0) {
        ruleta.incremento -= 0.007;
        audio.defaultPlaybackRate -= 0.2;
      } else {
        ruleta.setIncremento();
        ruleta.setSeleccionarPregunta();
        audio.pause();
        clearInterval(intervalo);
        let pregunta = new Pregunta(
          ruleta.preguntas,
          ruleta.preguntaSeleccionada
        );
        pregunta.removerModal();
        pregunta.mostrarModal();
        band = true;
      }
    }, 100);
  }
};
