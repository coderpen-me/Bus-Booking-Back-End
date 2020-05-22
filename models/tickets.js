const mongoose = require('mongoose');

const Tickets = mongoose.Schema({
    booked_seat_numbers: {
        type: Array
    },
    ticket_id: {
        type: Number
    },
    name_of_passanger: {
        type: String
    },
    Booking_Timestamp: {
        type: Date
    }
});

module.exports = mongoose.model('tickets', Tickets, 'tickets');