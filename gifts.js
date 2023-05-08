// Obtener la lista de regalos desde el servidor
async function fetchGifts(isAdmin = false) {
    try {
      const response = await fetch('/gifts');
      const gifts = await response.json();
      displayGifts(gifts, isAdmin);
      return gifts; // Devolver los regalos obtenidos
    } catch (error) {
      console.error('Error fetching gifts:', error);
    }
  }
  

// Mostrar la lista de regalos en la página
function displayGifts(gifts, isAdmin = false) {
    const giftsList = document.getElementById('gifts-list');
    
    if (giftsList) {
      giftsList.innerHTML = '';
  
      gifts.forEach((gift) => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');
    
        const giftName = document.createElement('p');
        giftName.textContent = gift.name;
        giftItem.appendChild(giftName);
    
        if (gift.selected) {
          giftItem.classList.add('gift-selected');
          const selectedBy = document.createElement('p');
          selectedBy.textContent = `Seleccionado por: ${gift.selectedBy}`;
          giftItem.appendChild(selectedBy);
        } else {
          const selectButton = document.createElement('button');
          selectButton.textContent = 'Seleccionar';
          selectButton.onclick = () => selectGift(gift.id);
          giftItem.appendChild(selectButton);
        }
        giftsList.appendChild(giftItem);
    });
}

const adminButton = document.getElementById('admin-button');
if (adminButton) {
  adminButton.onclick = isAdmin ? null : showAdminLogin;
}
}
  
  // Seleccionar un regalo
  async function selectGift(giftId) {
    const selectedBy = prompt('Por favor, ingresa tu nombre:');
    if (!selectedBy) return;
  
    const data = {
      selected: true,
      selectedBy: selectedBy,
      reserved: true
    };

    console.log('Updating gift with data:', data);
  
    try {
      const response = await fetch(`/gifts/${giftId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      console.log('JSON enviado:', data);
  
      if (response.ok) {
        alert('Regalo seleccionado exitosamente!');
        fetchGifts();
        if (window.location.pathname === '/admin.html') {
          // Actualiza la tabla de administración si estamos en la página de administración
          refreshAdminTable();
        }
      } else {
        throw new Error('Error updating gift');
      }
      
    } catch (error) {
      console.error('Error selecting gift:', error);
    }
  }
 
  // Fetch gifts when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchGifts();
  });
  
  // Ruta para confirmar asistencia
    const confirmButton = document.getElementById("confirmacion");
        if (confirmButton) {
            confirmButton.addEventListener("click", function () {
                window.location.href = "https://api.whatsapp.com/send?phone=573195605371&text=¡Quiero%20unirme%20a%20la%20fiesta%20de%20la%20revelación%20de%20sexo!%20¿Será%20un%20niño%20o%20una%20niña?%20No%20puedo%20esperar%20para%20descubrirlo%20y%20celebrar%20junto%20a%20todos.%20¡Vamos%20a%20hacerlo%20un%20día%20inolvidable!";
        });
    }

    // Redirigir a la página de administrador
    const adminButton = document.getElementById('admin-button');
        if (adminButton) {
            adminButton.addEventListener('click', () => {
                window.location.href = 'admin.html';
        });
    }

    function showAdminLogin() {
        // Aquí puedes agregar el código para mostrar el formulario de inicio de sesión de administrador
      }

      function updateGifts(gifts) {
        const giftList = document.getElementById('gift-list');
      
        if (giftList) {
          gifts.forEach((gift) => {
            const giftRow = giftList.querySelector(`[data-id="${gift.id}"]`);
      
            if (giftRow) {
              const selectedCell = giftRow.children[2];
              selectedCell.textContent = gift.selected ? 'Sí' : 'No';
      
              const selectedByCell = giftRow.children[3];
              selectedByCell.textContent = gift.selectedBy || '-';
      
              const reservedCell = giftRow.children[4];
              reservedCell.textContent = gift.reserved ? 'Sí' : 'No';
            }
          });
        }
      }
      
      

