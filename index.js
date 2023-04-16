const { WebcastPushConnection } = require('tiktok-live-connector');
const tmi = require('tmi.js');
const fs = require('fs');

let tiktokUsername = "<INSERTTIKTOKUSERNAMEHERE>";

const options = {
    channels: ['<INSERTTWTICHUSERNAMEHERE>']
};

const now = new Date();
const month = now.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
const day = now.getDate();
const year = now.getFullYear();
console.log(`Current date: ${month}/${day}/${year} ${now.toLocaleTimeString()}`);






const client = new tmi.client(options);
// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    const now = new Date();
    const month = now.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
    const day = now.getDate();
    const year = now.getFullYear();

const CurrentTime = `${month}/${day}/${year} ${now.toLocaleTimeString()}`

    console.log("\x1b[32m%s\x1b[0m | \x1b[33muser %s\x1b[0m ~> \x1b[36m%s\x1b[0;1m", CurrentTime + " TikTok", data.uniqueId, data.comment);

    var text = `${CurrentTime} TikTok | user ${data.uniqueId} ~> ${data.comment}\n`
    fs.appendFile('ChatLog.txt', text, (err) => {
        if (err) throw err;
       
    });

})


// And here we receive gifts sent to the streamer
tiktokLiveConnection.on('gift', data => {
    const now = new Date();
    const month = now.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
    const day = now.getDate();
    const year = now.getFullYear();

const CurrentTime = `${month}/${day}/${year} ${now.toLocaleTimeString()}`

    // console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    console.log("\x1b[32m%s\x1b[0m | \x1b[33muser %s\x1b[0m Gifted ~> \x1b[36;1m%s\x1b[0m", CurrentTime + " TikTok", data.uniqueId, data.giftId);


    var text = `${CurrentTime} TikTok | user ${data.uniqueId} Gifted ~> ${data.giftId}\n`
    fs.appendFile('ChatLog.txt', text, (err) => {
        if (err) throw err;
     
    });

})


const Twitch = new tmi.client(options);

Twitch.on('message', (channel, tags, message, self) => {
    const now = new Date();
    const month = now.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
    const day = now.getDate();
    const year = now.getFullYear();

    const CurrentTime = `${month}/${day}/${year} ${now.toLocaleTimeString()}`
    console.log(`\x1b[35m${CurrentTime} Twitch\x1b[0m | \x1b[33muser ${tags.username}\x1b[0m ~> \x1b[36m${message}\x1b[0m`);

    var text  = `${CurrentTime} Twitch | user ${tags.username} ~> ${message}\n`
    fs.appendFile('ChatLog.txt', text, (err) => {
        if (err) throw err;
    });
});

Twitch.connect();
