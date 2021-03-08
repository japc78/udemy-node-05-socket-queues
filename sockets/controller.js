const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last );

    socket.on('next-ticket', ( payload, callback ) => {
        const nextTicket = ticketControl.nextTicket();
        callback(nextTicket);

        // TODO Notificar que hay un nuevo ticket pendiente de asignar
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

        // TODO Notificar cambio en last4

        if (!ticket) {
            callback({
                ok: false,
                msg: 'There are not ticket that to attend'
            })
        } else {
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