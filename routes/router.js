const express = require('express');
const router = express.Router();
const bus_seats = require('../models/bus_seats.js');
const tickets = require('../models/tickets.js');
const rnd = require('random-int');


router.get('/status', (req, res, next) => {
    bus_seats.find({ "seat_number": req.query.number })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/all_free', (req, res, next) => {
    bus_seats.find({ "status": 0 })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/all_booked', (req, res, next) => {
    tickets.find({}).sort({ "booked_seat_number": 1 })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/book_seat', (req, res, next) => {
    //console.log(req.query.number);
    //console.log(typeof(req.query.number));
    bus_seats.findOne({ "seat_number": req.query.number }).then((output) => {
        //console.log(output);
        if (output.status == 0) {
            tickets.insertMany({
                "booked_seat_number": req.query.number,
                "ticket_id": rnd(0, 2147483647),
                "name_of_passanger": req.query.name,
                "Booking_Timestamp": new Date(),
                "Email": req.query.email,
                "Mobile_Number": req.query.mobile
            }).then((success, error) => {
                if (success) {
                    bus_seats.updateOne({ "seat_number": req.query.number }, { $set: { "status": 1 } }).then((success, error) => {
                        if (success) {
                            return res.status(200).send('Seat number ' + req.query.number + ' is Booked');
                        } else {
                            return res.status(500).send(error);
                        }
                    });
                } else {
                    return res.status(500).send(error);
                }
            });
        } else {
            return res.status(500).send('Seat number ' + req.query.number + ' is Already Booked');
        }
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/free_seat', (req, res, next) => {
    //console.log(req.query.number);
    //console.log(typeof(req.query.number));
    bus_seats.findOne({ "seat_number": req.query.number }).then((output) => {
        //console.log(output);
        if (output.status == 1) {
            tickets.deleteOne({
                "booked_seat_number": req.query.number
            }).then((success, error) => {
                if (success) {
                    bus_seats.updateOne({ "seat_number": req.query.number }, { $set: { "status": 0 } }).then((success, error) => {
                        if (success) {
                            return res.status(200).send('Seat number ' + req.query.number + ' is now free');
                        } else {
                            return res.status(500).send(error);
                        }
                    });
                } else {
                    return res.status(500).send(error);
                }
            });
        } else {
            return res.status(500).send('Seat  number ' + req.query.number + ' is Already Free');
        }
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;