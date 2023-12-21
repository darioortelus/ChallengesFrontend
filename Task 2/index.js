const APIURL = "https://dog.ceo/api";
let listDogs = [];

// Función para manejar errores de manera consistente
const handleError = (error) => {
  console.error("ERROR:", error);
  alert("Algo salio mal.");
};

// Obtener la lista de perros desde la API
const getListDogs = async () => {
  try {
    const response = await fetch(`${APIURL}/breeds/list/all`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    handleError(error);
    return {};
  }
};

// Obtener la imagen de un perro específico
const getDogImage = async (breed) => {
  try {
    const response = await fetch(`${APIURL}/breed/${breed}/images/random`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    handleError(error);
    return '';
  }
};

// Crear las tarjetas de perros y actualizar el contenido en el DOM
const createCards = async () => {
  const keys = Object.keys(listDogs);
  const template = await Promise.all(keys.map(async (element) => {
    // Obtener la imagen del perro y las subrazas
    const dogImage = await getDogImage(element);
    const subBreeds = listDogs[element].length > 0 ? listDogs[element].join(', ') : "No hay resultados.";

    // Construir la plantilla HTML para cada tarjeta de perro
    return `<div class="card">
              <img src="${dogImage}" alt="Imagen ${element}" class="card-image">
              <div class="card-content">
                  <div class="card-header">
                      <svg class="forma" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                      <div class="card-text">
                          <h3 class="card-title">${element}</h3>   
                      </div>
                  </div>
                  <div class="card-description">
                      <p>Sub-Breeds: <br>${subBreeds}</p>
                  </div>
              </div>
          </div>`;
  }));

  // Actualizar el contenido en el DOM una sola vez después de crear todas las tarjetas
  document.getElementById('cards').innerHTML = template.join('');
};

// Función principal para cargar la lista de perros y crear las tarjetas
const cargar = async () => {
  listDogs = await getListDogs();
  createCards();
};

// Ejecutar la función principal cuando la ventana se carga completamente
window.onload = cargar;
