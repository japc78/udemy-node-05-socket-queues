const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last );

    socket.on('next-ticket', ( payload, callback ) => {
        const nextTicket = ticketControl.nextTicket();
        callback(nextTicket);

        // TODO Notificar que hay un nuevo ticket pendiente de asignar
    })
}

module.exports = {
    socketController
}