// HOMEWORK #2 FINISHED!!!!

// Definición de la clase Activity
class Activity {
  constructor(id, title, description, imgUrl) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imgUrl = imgUrl;
  }
}

// Definición de la clase Repository
class Repository {
  constructor() {
      this.activities = []; // Arreglo para almacenar las actividades
  }

  // Método para obtener todas las actividades
  getAllActivities() {
      return this.activities;
  }

  // Método para crear una nueva actividad
  createActivity(id, title, description, imgUrl) {
      const newActivity = new Activity(id, title, description, imgUrl);
      this.activities.push(newActivity);
  }

  // Método para eliminar una actividad por su id (Extra Credit)
  deleteActivity(id) {
      this.activities = this.activities.filter(activity => activity.id !== id);
  }
}

//HOMEWORK #3 FINISHED!!!

// Crear una instancia de la clase Repository
const repository = new Repository();

// Función para agregar una nueva actividad
function agregarActividad() {
  // Obtener los valores de los campos de entrada
  var titulo = document.getElementById('titulo').value;
  var descripcion = document.getElementById('descripcion').value;
  var urlImagen = document.getElementById('url-imagen').value;

  // Validar que todos los campos estén completos
  if (titulo && descripcion && urlImagen) {
      // Crear una nueva actividad y agregarla al repositorio
      var id = repository.getAllActivities().length + 1; // Generar un nuevo ID basado en la cantidad actual de actividades
      repository.createActivity(id, titulo, descripcion, urlImagen);

      // Limpiar los campos de entrada después de agregar la actividad
      document.getElementById('titulo').value = '';
      document.getElementById('descripcion').value = '';
      document.getElementById('url-imagen').value = '';

      // Actualizar la vista de actividades
      actualizarVistaActividades();
  } else {
      // Mostrar un mensaje de error si algún campo está vacío
      alert('Por favor, completa todos los campos.');
  }
}

// Función para actualizar la vista de actividades
function actualizarVistaActividades() {
  var contenedorActividades = document.querySelector('.actividades');
  contenedorActividades.innerHTML = ''; // Limpiar el contenido del contenedor

  // Obtener todas las actividades del repositorio
  var actividades = repository.getAllActivities();

  // Iterar sobre cada actividad y agregarla a la vista
  actividades.forEach(function(actividad) {
      var actividadHTML = `
          <div class="actividad">
              <h3>${actividad.title}</h3>
              <p>${actividad.description}</p>
              <img src="${actividad.imgUrl}" alt="${actividad.title}">
          </div>
      `;
      contenedorActividades.innerHTML += actividadHTML;
  });
}

// Función para convertir una instancia de Activity en un elemento HTML
function actividadAElementoHTML(actividad) {
  // Extraer las propiedades de la actividad utilizando destructuring
  const { title, description, imgUrl } = actividad;

  // Crear elementos HTML para cada propiedad de la actividad
  const tituloElemento = document.createElement('h3');
  const descripcionElemento = document.createElement('p');
  const imagenElemento = document.createElement('img');
  const actividadElemento = document.createElement('div');

  // Asignar los valores a las propiedades correspondientes de los elementos
  tituloElemento.innerHTML = title;
  descripcionElemento.innerHTML = description;
  imagenElemento.src = imgUrl;

  // Agregar las clases CSS correspondientes a los elementos
  tituloElemento.classList.add('titulo-actividad');
  descripcionElemento.classList.add('descripcion-actividad');
  imagenElemento.classList.add('imagen-actividad');
  actividadElemento.classList.add('actividad');

  // Appendear los elementos al elemento de la actividad
  actividadElemento.appendChild(tituloElemento);
  actividadElemento.appendChild(descripcionElemento);
  actividadElemento.appendChild(imagenElemento);

  // Asignar al div la clase CSS correspondiente
  actividadElemento.classList.add('tarjeta-actividad');

  // Retornar el div finalizado con todos los elementos correspondientes dentro
  return actividadElemento;
}

// Función para agregar todas las actividades al contenedor correspondiente
function agregarActividadesAlContenedor() {
  // Seleccionar el contenedor donde queremos agregar las actividades
  const contenedorActividades = document.querySelector('.actividades');

  // Vaciar el contenido actual del contenedor
  contenedorActividades.innerHTML = '';

  // Obtener el listado completo de actividades mediante el método correspondiente de la instancia de Repository
  const actividades = repository.getAllActivities();

  // Mapear el listado de actividades para convertirlos en elementos HTML
  const elementosHTMLActividades = actividades.map(actividad => actividadAElementoHTML(actividad));

  // Appendear todos los elementos HTML del nuevo array dentro del contenedor seleccionado
  elementosHTMLActividades.forEach(elementoHTML => contenedorActividades.appendChild(elementoHTML));
}

// Función handler para el evento del botón
function handleAgregarActividad() {
  // Seleccionar los inputs de title, description e imgUrl
  const inputTitulo = document.getElementById('titulo');
  const inputDescripcion = document.getElementById('descripcion');
  const inputUrlImagen = document.getElementById('url-imagen');

  // Tomar los valores ingresados en los inputs y guardarlos en variables
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();
  const urlImagen = inputUrlImagen.value.trim();

  // Validar que los valores estén completos
  if (!titulo || !descripcion || !urlImagen) {
      // Mostrar un mensaje de error si algún campo está incompleto
      alert('Por favor, completa todos los campos.');
      return; // Cortar el proceso
  }

  // Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad
  const id = repository.getAllActivities().length + 1; // Generar un nuevo ID basado en la cantidad actual de actividades
  repository.createActivity(id, titulo, descripcion, urlImagen);

  // Invocar la función para "refrescar" el contenedor de actividades
  agregarActividadesAlContenedor();
}

// Seleccionar el botón que disparará el evento de agregar actividad
const botonAgregar = document.getElementById('boton-agregar');

// Agregar un Event Listener al botón para el evento click
botonAgregar.addEventListener('click', handleAgregarActividad);

// Agregar Event Listeners a las tarjetas para eliminarlas al hacer clic
const tarjetas = document.querySelectorAll('.actividad');

tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', function() {
        // Eliminar la tarjeta del contenedor
        tarjeta.remove();
        // También puedes eliminar la actividad del Repository si lo deseas
        // repository.deleteActivity(id);
    });
});
// A PARTIR DE AQUI ES UN EXTRA QUE LE COLOQUE PARA QUE SE VIERA MAS PRESENTABLE :D
function agregarActividad() {
  // Mostrar ventana de carga
  document.getElementById("cargandoModal").style.display = "flex";

  // Simular una carga de 1 segundo 
  setTimeout(function(){
      // Ocultar ventana de carga después de 1 segundo
      document.getElementById("cargandoModal").style.display = "none";

      // Limpiar los valores de los inputs
      document.getElementById("titulo").value = "";
      document.getElementById("descripcion").value = "";
      document.getElementById("url-imagen").value = "";

      
  }, 1000); // 1 segundo de carga simulada
}
