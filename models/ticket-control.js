const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, '../db/data.json');

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
}

module.exports = TicketControl;