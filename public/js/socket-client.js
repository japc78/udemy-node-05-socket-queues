const socket = io();

const lbOn  = document.querySelector('#lb-online');
const lbOff = document.querySelector('#lb-offline');

// Eventos o Observables del cliente
socket.on('connect', ()=> {
    lbOn.style.display = 'inline';
    lbOff.style.display = 'none';
});

socket.on('disconnect', ()=> {
    lbOn.style.display = 'none';
    lbOff.style.display = 'inline';
})

// Evento personalizado
socket.on('channel-test', (payload)=> {
    console.log(payload);
});