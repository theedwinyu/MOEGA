const router = require('express').Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const client = require('twilio')(accountSid, authToken);
const { connect } = require('twilio-video');

router.route('/createRoom').post((req, res) => {
    const roomName = req.body.roomName;

    client.video.rooms
    .create({
        recordParticipantsOnConnect: true,
        type: 'group',
        uniqueName: roomName
        })
    .then(room => {
        console.log(room);
        res.json(room.sid);
    });
});

router.route('/completeRoom').post((req, res) => {
    const roomSID = req.body.sid;

    client.video.rooms(roomSID)
    .update({status: 'completed'})
    .then(room => {
        console.log(room.uniqueName)
        res.json(room)
    });
});

router.route('/getRoomStatus/:roomSID').get((req, res) => {
    const roomSID = req.params.roomSID;
    client.video.rooms(roomSID)
            .fetch()
            .then(room => res.json(room));
});

router.route('/connectToRoom/:token/:roomName').get((req, res) => {
    const token = req.params.token;
    const roomName = req.params.roomName;
    connect(token, { name: roomName }).then(room => {
    console.log(`Successfully joined a Room: ${room}`);
    room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`);
    });
    }, error => {
    console.error(`Unable to connect to Room: ${error.message}`);
    });

});

router.route('/generateToken/:identity/:roomName').get((req, res) => {
    const identity = req.params.identity;
    const roomName = req.params.roomName;

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret);
    token.identity = identity;

    // Create a Video grant which enables a client to use Video 
    // and limits access to the specified Room (DailyStandup)
    const videoGrant = new VideoGrant({
        room: roomName
    });

    // Add the grant to the token
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    console.log(token.toJwt());
    res.json({token: token.toJwt(), identity})
});

module.exports = router;