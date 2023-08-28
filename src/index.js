const { exec } = require("child_process"),
  { Partials, IntentsBitField } = require("discord.js"),
  http = require("http"),
  { SapphireClient } = require("@sapphire/framework"),
  config = require("../config.json"),
  client = new SapphireClient({
    defaultPrefix: config.prefix,
    loadMessageCommandListeners: true,
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.DirectMessages,
      IntentsBitField.Flags.DirectMessageTyping,
      IntentsBitField.Flags.DirectMessageReactions,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User],
  }),
  server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end();
  }),
  { get } = require("https");
client.on("debug", (info) => {
  const check429error = info.split(" ");
  if (check429error[2] === "429") {
    console.log("[ANTI RATELIMIT] GOT A RATELIMIT");
    process.exit(1);
  }
});

async function handleRateLimit() {
  let d = new Date();
  await get(`https://discord.com/api/v10/gateway`, ({ statusCode }) => {
    console.log(
      "[ANTI RATELIMIT v10] " + (new Date() - d) + "ms" + " / " + statusCode
    );
    if (statusCode == 429) {
      console.log("[ANTI RATELIMIT v10] GOT A RATELIMIT");
      exec("kill 1");
    }
  });
  await get(`https://discord.com/api/v9/gateway`, ({ statusCode }) => {
    console.log(
      "[ANTI RATELIMIT v9] " + (new Date() - d) + "ms" + " / " + statusCode
    );
    if (statusCode == 429) {
      console.log("[ANTI RATELIMIT v9] GOT A RATELIMIT");
      exec("kill 1");
    }
  });
}
handleRateLimit();
setInterval(async () => await handleRateLimit(), 180000);
process.on("unhandledRejection", async (reason, promise) => {
  client.logger.error(`[ANTI CRASH] unhandledRejection`, reason, promise);
});

process.on("uncaughtExceptionMonitor", async (err, origin) => {
  client.logger.error(`[ANTI CRASH] uncaughtExceptionMonitor`, err, origin);
});
process.on("uncaughtException", async (err, origin) => {
  client.logger.error(`[ANTI CRASH] uncaughtException`, err, origin);
});
process.on("warning", async (error) => {
  client.logger.warn(`[PROCESS WARNING]` + error);
});
client.on("warn", async (error) => {
  client.logger.warn(`[CLIENT WARNING] ` + error);
});
client.on("error", async (error) => {
  client.logger.error(`[CLIENT ERROR]` + error);
});
client.on("shardError", async (error) => {
  client.logger.error(`[SHARD/CLIENT ERROR]` + error);
});
exec;
client.login(process.env["token"]);
server.listen(undefined, "localhost", () => {
  client.logger.info("Hosted website");
});
