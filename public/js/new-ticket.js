const socket = io();

const lblNewTicket  = document.querySelector('#lbl-newTicket');
const btnCreateTicket = document.querySelector('#btn-createTicket');

// Eventos o Observables del cliente
socket.on('connect', ()=> {
    btnCreateTicket.disabled = false;
});

socket.on('last-ticket', (lastTicket) => {
    lblNewTicket.innerText = 'Ticket ' + lastTicket;
});

socket.on('disconnect', ()=> {
    btnCreateTicket.disabled = true;
})


btnCreateTicket.addEventListener('click', () => {
    socket.emit('next-ticket', null, (ticket)=> {
        console.log(ticket);
        lblNewTicket.innerText = ticket;
    });
})