const socket = io();

const lblDesktop = document.querySelector('h1');
const btnAttendTicket = document.querySelector('button');
const lblTicket = document.querySelector('small');
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

socket.on('last-ticket', (lastTicket) => {
    // lblTicket.innerText = 'Ticket ' + lastTicket;
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