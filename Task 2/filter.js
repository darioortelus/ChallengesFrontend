// URL de la API de perros
const APIURL = "https://dog.ceo/api";

// Variable para almacenar la lista de perros
let listDogs = [];

// Elemento de entrada para la búsqueda
const searchInput = document.getElementById('searchInput');

// Número de elementos por página
const itemsPerPage = 10;

// Página actual
let currentPage = 1;

// Función para obtener la lista de perros desde la API
const getListDogs = async () => {
  try {
    const response = await fetch(`${APIURL}/breeds/list/all`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("ERROR:", error);
    alert("Algo salió mal.");
  }
};

// Función para crear la tabla de perros
const createTable = () => {
  // Calcular el índice de inicio y fin para la paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener una porción de la lista de perros según la página actual
  const slicedDogs = Object.entries(listDogs).slice(startIndex, endIndex);

  // Construir la plantilla HTML para la tabla
  let template = "";
  slicedDogs.forEach(([breed, subBreeds], index) => {
    template += `<tr>
      <td>${startIndex + index + 1}</td>
      <td>${breed}</td>
      <td class="breeds">${subBreeds.toString()}</td>
    </tr>`;
  });

  // Actualizar el contenido en el DOM
  document.getElementById('tbody').innerHTML = template;
  document.getElementById('page-info').innerHTML = `Página ${currentPage} de ${Math.ceil(Object.keys(listDogs).length / itemsPerPage)}`;
};

// Función para ir a la siguiente página
const nextPage = () => {
  const totalPages = Math.ceil(Object.keys(listDogs).length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    createTable();
  }
};

// Función para ir a la página anterior
const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    createTable();
  }
};

// Función para filtrar la lista de perros por nombre o subrazas
const searchByNameOrSubBreeds = async (query) => {
  if (query.trim() !== "") {
    // Convertir la consulta a minúsculas para una búsqueda sin distinción de mayúsculas
    const lowercaseQuery = query.toLowerCase();

    // Filtrar la lista de perros según el nombre o subrazas que coincidan con la consulta
    const filteredDogs = Object.entries(listDogs).filter(([breed, subBreeds]) => {
      return breed.toLowerCase().includes(lowercaseQuery) || subBreeds.join(', ').toLowerCase().includes(lowercaseQuery);
    });

    // Actualizar la lista de perros con los datos filtrados
    listDogs = Object.fromEntries(filteredDogs);
  } else {
    // Cargar la lista completa si el campo de búsqueda está vacío
    listDogs = await getListDogs();
  }

  // Volver a la primera página después de filtrar
  currentPage = 1;

  // Actualizar la tabla
  createTable();
};

// Escuchar eventos de entrada en el campo de búsqueda
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  searchByNameOrSubBreeds(query);
});

// Función principal para cargar la lista de perros y crear la tabla
const cargar = async () => {
  // Obtener la lista de perros
  listDogs = await getListDogs();

  // Crear la tabla inicial
  createTable();
};

// Cargar la función principal cuando la ventana se carga completamente
window.onload = cargar;
