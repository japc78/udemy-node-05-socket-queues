const socket = io();

const lblDesktop = document.querySelector('h1');
const btnAttendTicket = document.querySelector('button');
const lblTicket = document.querySelector('small');
const lblPending = document.querySelector('#lblPendientes');
const divAlert = document.querySelector('.alert');


// Para recoger parámetros por url, chrome y firefox.
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')){
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

divAlert.style.display = 'none';
const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;


// Eventos o Observables del cliente
socket.on('connect', ()=> {
    btnAttendTicket.disabled = false;
});

socket.on('tickets-pending', (count) => {
    if (!count > 0) {
        lblPending.style.display = 'none';
    } else {
        lblPending.style.display = '';
        lblPending.innerText = count;
    }

});


socket.emit('last-ticket-attended', desktop, (ticket) => {
    if (ticket) lblTicket.innerText = 'Ticket ' + ticket.number;
});

socket.on('disconnect', ()=> {
    btnAttendTicket.disabled = true;
})


btnAttendTicket.addEventListener('click', () => {

    const payload = { desktop }

    socket.emit('attend-ticket', payload, (res)=> {

        // console.log(res);
        const { ok, ticket} = res;

        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.number;
    });
})