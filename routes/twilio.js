const router = require('express').Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

router.route('/add').post((req, res) => {
    res.json("hi")
});

router.route('/:id').get((req, res) => {
    console.log(req.params.id);
    res.json("ok")
});

module.exports = router;