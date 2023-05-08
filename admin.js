// Obtener la lista de regalos desde el servidor
async function fetchGifts(isAdmin = false) {
    try {
      const response = await fetch('/gifts');
      const gifts = await response.json();
      displayGifts(gifts, isAdmin);
      return gifts;
    } catch (error) {
      console.error('Error fetching gifts:', error);
    }
  }

  // actualice la tabla de administración después de seleccionar un regalo
  async function refreshAdminTable() {
    const gifts = await fetchGifts(true);
    displayGifts(gifts, true);
  }
  
 // Mostrar la lista de regalos en la página
function displayGifts(gifts, isAdmin = false) {
    const giftList = document.getElementById('gift-list');
    console.log("giftlist",giftList)
    if (giftList) {
      // Limpiar la tabla antes de mostrar los nuevos datos
      giftList.innerHTML = '';
  
      gifts.forEach((gift) => {
        const giftRow = document.createElement('tr');
        giftRow.setAttribute('data-id', gift.id);
  
        const idCell = document.createElement('td');
        idCell.textContent = gift.id;
        giftRow.appendChild(idCell);
  
        const nameCell = document.createElement('td');
        nameCell.textContent = gift.name;
        giftRow.appendChild(nameCell);
  
        const selectedCell = document.createElement('td');
        selectedCell.textContent = gift.selected ? 'Sí' : 'No';
        giftRow.appendChild(selectedCell);
  
        const selectedByCell = document.createElement('td');
        selectedByCell.textContent = gift.selectedBy || "-";
        giftRow.appendChild(selectedByCell);
  
        const reservedCell = document.createElement('td');
        reservedCell.textContent = gift.reserved ? 'Sí' : 'No';
        giftRow.appendChild(reservedCell);
  
        giftList.appendChild(giftRow);
      });
    }
  }
  
// Iniciar sesión como administrador
async function loginAdmin(event, form) {
    event.preventDefault(); 

    // Obtener los valores de usuario y contraseña del formulario
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
  
    try {
      // Enviar una solicitud POST a la ruta '/admin/login' con los datos de inicio de sesión
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const { success } = await response.json();
        if (success) {
          alert('Inicio de sesión exitoso. Ahora eres administrador.');
          displayAdminView();
        } else {
          alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      } else {
        throw new Error('Error logging in');
      }
    } catch (error) {
      console.error('Error logging in as admin:', error);
    }
  }
  
  function displayAdminView() {
    const adminLoginForm = document.querySelector('.admin-login');
    if (adminLoginForm) {
      adminLoginForm.remove();
    }
  
    // Cambiar a un selector de ID
    const addGiftFormContainer = document.querySelector('#add-gift-form-container');
    if (addGiftFormContainer) {
      addGiftFormContainer.classList.remove('hidden');
    }
  
    const giftTable = document.getElementById('gift-table');
    if (giftTable) {
      giftTable.classList.remove('hidden');
    }
  
    fetchGifts(true);
  }
  
      
  
  // Fetch gifts when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchGifts();
  
    // Asociar el evento submit al formulario
    const addNewGiftForm = document.getElementById('add-new-gift-form');
    if (addNewGiftForm) {
      addNewGiftForm.addEventListener('submit', (event) => {
        addGift(event, addNewGiftForm);
      });
    }
  });

  async function addGift(event, form) {
    event.preventDefault();
  
    // Obtener el nombre del regalo del formulario
    const formData = new FormData(form);
    const name = formData.get('gift-name');
  
    try {
      // Enviar una solicitud POST a la ruta '/gifts' con el nombre del regalo
      const response = await fetch('/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
  
      if (response.ok) {
        const { success } = await response.json();
        if (success) {
          alert('Regalo agregado exitosamente.');
          form.reset(); // Limpiar el formulario
          fetchGifts(true); // Actualizar la lista de regalos
        } else {
          alert('Error al agregar el regalo. Inténtalo de nuevo.');
        }
      } else {
        throw new Error('Error adding gift');
      }
    } catch (error) {
      console.error('Error adding gift:', error);
    }
  }
  
// Obtener el botón de actualización
const refreshButton = document.getElementById('refresh-button');

// Agregar un controlador de eventos para hacer una petición al servidor cuando se hace clic en el botón
refreshButton.addEventListener('click', async () => {
  // Obtener los datos actualizados del servidor
  const gifts = await fetchGifts();

  // Actualizar la tabla con los nuevos datos
  displayGifts(gifts, true, 'gift-list');
});

async function refreshGifts() {
    const gifts = await fetchGifts(true);
    displayGifts(gifts, true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetchGifts(true);
  
    // Asociar el evento submit al formulario
    const addNewGiftForm = document.getElementById('add-new-gift-form');
    if (addNewGiftForm) {
      addNewGiftForm.addEventListener('submit', (event) => {
        addGift(event, addNewGiftForm);
      });
    }
  
    // Asociar el evento click al botón de actualizar lista de regalos
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
      refreshButton.addEventListener('click', refreshGifts);
    }
  });
  
  