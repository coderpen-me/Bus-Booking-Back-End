const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Tickets = mongoose.Schema({
    booked_seat_number: {
        type: Int32
    },
    ticket_id: {
        type: Int32
    },
    name_of_passanger: {
        type: String
    },
    Booking_Timestamp: {
        type: Date
    },
    Email: {
        type: String
    },
    Mobile_Number: {
        type: String
    }
});

module.exports = mongoose.model('tickets', Tickets, 'tickets');