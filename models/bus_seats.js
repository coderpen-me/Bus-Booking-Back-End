const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const busSeats = mongoose.Schema({
    seat_number: {
        type: Int32
    },
    status: {
        type: Int32
    }
});

module.exports = mongoose.model('bus_seats', busSeats, 'bus_seats');