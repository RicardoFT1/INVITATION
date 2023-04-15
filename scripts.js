document.querySelector("button").addEventListener("click", function() {
  window.location.href = "https://api.whatsapp.com/send?phone=573195605371&text=¡Quiero%20unirme%20a%20la%20fiesta%20de%20la%20revelación%20de%20sexo!%20¿Será%20un%20niño%20o%20una%20niña?%20No%20puedo%20esperar%20para%20descubrirlo%20y%20celebrar%20junto%20a%20todos.%20¡Vamos%20a%20hacerlo%20un%20día%20inolvidable!";
}); 
window.addEventListener('load', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  document.body.appendChild(canvas);
  
  particlesJS('confetti-canvas', {
  particles: {
  number: {
  value: 100,
  },
  shape: {
  type: ['circle', 'triangle', 'polygon', 'star'],
},
size: {
value: 10,
random: true,
},
color: {
value: ['#a569e2', '#e63d87', '#00c7e4', '#fdd67e'],
},
opacity: {
value: 0.7,
random: true,
},
move: {
direction: 'none',
speed: 3,
random: true,
straight: false,
},
},
interactivity: {
events: {
onhover: {
enable: false,
},
onclick: {
enable: false,
},
},
},
});
});