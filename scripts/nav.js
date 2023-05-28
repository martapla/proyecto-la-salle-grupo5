/*Escribir un script en vuestra página, que cuando se pulse una tecla del 1 al 5, haga
scroll a la sección correspondiente. Para hacer scroll, sólo hace falte "navegar" con
window.location = "#id-de-la-seccion"*/

document.addEventListener("keydown", function (event) {
  // Obtener el valor de la tecla presionada
  var tecla = event.key;

  // Verificar si el elemento con aria-label="navigationHelp" tiene la clase "show"
  var navigationHelp = document.querySelector('[aria-label="navigationHelp"]');
  if ((navigationHelp && navigationHelp.classList.contains('show')) && tecla != "Escape") {
    return; // Si está presente y tiene la clase "show", se detiene la ejecución del evento keydown
  }

  // Determinar a qué sección se debe desplazar la página
  switch (tecla) {
    case "1":
      window.location = "#who";
      break;
    case "2":
      window.location = "#services";
      break;
    case "3":
      window.location = "#portfolio";
      break;
    case "4":
      window.location = "#location";
      break;
    case "5":
      window.location = "#emailus";
      break;
    case "?":
      showModal();
      break;
    case "Escape":
      hideModal();
      console.log(tecla);
      break;
    default:
      console.log("nav", tecla);
      break;
  }
});

let showModal = function () {
  let modal = document.querySelector(`[aria-label=navigationHelp]`);
  modal.classList.add(`show`, `block`);
  modal.innerHTML = modalContent;
}

let hideModal = function () {
  let modal = document.querySelector(`[aria-label=navigationHelp]`);
  modal.classList.remove(`show`, `block`);
}

let modalContent = `<div class="modal-dialog">
  <div class="modal-content d-flex flex-auto flex-column">
    <div class="modal-header justify-content-center">
      <h1 class="modal-title">Keyboard shortcuts</h1>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <ul class="col-9 list-inline justify-content-center align-items-center">
        <li class="d-flex justify-content-between align-items-center">
          <div>Bring up this help dialog</div>
          <div>
            <kbd>
              <span>
                ?
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Who We are?" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                1
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Services" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                2
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Portfolio" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                3
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Location" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                4
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Email Us" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                5
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Move to Next section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                n
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Move to Previous section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                p
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Close this help dialog</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                Esc
              </span>
            </kbd>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>`


// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  var secciones = [ "header", "who", "services", "portfolio", "location", "emailus" ];
  var indiceActual = 0;

  // Función para actualizar el índice actual basado en la sección visible en el área de visualización
  function actualizarIndiceActual() {
    for (var i = 0; i < secciones.length; i++) {
      var seccion = document.getElementById(secciones[ i ]);
      var rect = seccion.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        indiceActual = i;
        break;
      }
    }
  }

  // Función para desplazarse a la sección siguiente
  function irSiguienteSeccion() {
    if (indiceActual < secciones.length - 1) {
      indiceActual++;
      var seccionSiguiente = document.getElementById(secciones[ indiceActual ]);
      seccionSiguiente.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Función para desplazarse a la sección anterior
  function irSeccionAnterior() {
    if (indiceActual > 0) {
      indiceActual--;
      var seccionAnterior = document.getElementById(secciones[ indiceActual ]);
      seccionAnterior.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Escuchar el evento de tecla presionada
  document.addEventListener("keydown", function (event) {
    if (event.key === "n") {
      // Tecla "n" para ir a la siguiente sección
      irSiguienteSeccion();
    } else if (event.key === "p") {
      // Tecla "p" para ir a la sección anterior
      irSeccionAnterior();
    }
  });

  // Escuchar el evento de scroll
  window.addEventListener("scroll", function () {
    // Actualizar el índice actual basado en la sección visible en el área de visualización
    actualizarIndiceActual();
  });

  // Desplazarse a la primera sección (header) al cargar la página
  var header = document.getElementById("header");
  header.scrollIntoView({ behavior: 'auto', block: 'start' });
});