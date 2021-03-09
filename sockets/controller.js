const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit('last-ticket', ticketControl.last );
    socket.emit('last4-ticket', ticketControl.last4);
    socket.emit('tickets-pending', ticketControl.tickets.length);

    socket.on('next-ticket', ( payload, callback ) => {
        const nextTicket = ticketControl.nextTicket();
        callback(nextTicket);

        // TODO Notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);


    })



    socket.on('attend-ticket', (payload, callback ) => {

        const { desktop } = payload;

        if (!desktop) {
            return callback({
                ok: false,
                msg: 'Desktop is required'
            })
        }

        const ticket = ticketControl.attendTicket(desktop);

        // Notificar cambio en last4
        socket.broadcast.emit('last4-ticket', ticketControl.last4);
        socket.emit('tickets-pending', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'There are not ticket that to attend'
            })
        } else {
            socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

            callback({
                ok: true,
                ticket
            })
        }

        console.log(payload);
    })

    socket.on('last-ticket-attended', (desktop, callback) => {
        ticket = ticketControl.lastTicketAttended(desktop);
        callback(ticket);
    })
}

module.exports = {
    socketController
}