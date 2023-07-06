if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const {
    DISCORD_TOKEN,
} = process.env;

const { Client, ChannelTypes } = require("oceanic.js");
const client = new Client({ auth: `Bot ${DISCORD_TOKEN}`, intents: ["GUILD_MESSAGES"] });

client.on("ready", async() => {
    console.log("Ready as", client.user.tag);
});

// if you do not add a listener for the error event, any errors will cause an UncaughtError to be thrown,
// and your process may be killed as a result.
client.on("error", (err) => {
    console.error("Something Broke!", err);
});

client.on("messageCreate", (message) => {
    if (message.channel.type === ChannelTypes.GUILD_ANNOUNCEMENT) {
        message.crosspost().catch((err) => {
            console.error("Failed to cross post", err)
        })
    }
})

client.connect();
