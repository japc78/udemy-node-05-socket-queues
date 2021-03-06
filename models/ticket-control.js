const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, '../db/data.json');
const Ticket = require('./ticket');

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4,
        }
    }

    init() {
        try {
            if (!fs.existsSync(dbPath)) {
                fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
                console.log('File DB created');
            }
            // const data = require('../db/data.json');
            // // console.log(data);
            const { today, tickets, last, last4 } = require('../db/data.json');

            if (today === this.today) {
                this.tickets = tickets;
                this.last = last;
                this.last4 = last4;
            } else {
                this.saveDB();
            }
        } catch (error) {
            console.log(error);
        }
    }

    saveDB() {
        try {
            fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
        } catch (error) {
            console.log(error);
        }
    }


    nextTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveDB();

        return 'Ticket ' + ticket.number;
    }

    attendTicket(desktop) {
        // No hay tickets que atender
        if (this.tickets.length === 0) return null;

        // Se coge y se elimina el primer ticket del array
        const ticket = this.tickets.shift();

        ticket.desktop = desktop;

        // Se añade el ticket a los últimos 4
        this.last4.unshift(ticket);

        // Se borra el ultimo elemento si se cumple la condición
        if (this.last4.length > 4) this.last4.splice(-1,1);

        this.saveDB();

        return ticket;
    }



}

module.exports = TicketControl;