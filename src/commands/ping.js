const { isMessageInstance } = require("@sapphire/discord.js-utilities");
const { Command } = require("@sapphire/framework");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const ms = require("ms");

class _Command extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "ping",
      description: "Ping bot to see if it is alive",
    });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand(
      /** @param {SlashCommandBuilder} builder **/ (builder) =>
        builder
          .setName(this.name.toLowerCase())
          .setDescription(this.description)
    );
    /*
    registry.registerContextMenuCommand((builder) =>
      builder.setName("ping").setType(ApplicationCommandType.Message)
    );
    */
  }

  /**
   *
   * @param {import("discord.js").ContextMenuCommandInteraction} interaction
   * @returns
   */
  async contextMenuRun(interaction) {}

  /**
   *
   * @param {import("discord.js").Message} message
   * @returns
   */
  async messageRun(message) {
    let embed = new EmbedBuilder().setDescription(
      `Pingim : [${ms(
        Math.round(this.container.client.ws.ping)
      )}](https://google.com)`
    );
    let botunpingi = Math.round(this.container.client.ws.ping);
    if (botunpingi < 100) {
      embed.setColor(Colors.Green);
    }

    if (botunpingi > 101 && botunpingi < 249) {
      embed.setColor(Colors.Yellow);
    }

    if (botunpingi > 250) {
      embed.setColor(Colors.Red);
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ping")
        .setLabel("Yenile")
        .setStyle(ButtonStyle.Secondary)
    );
    await message.reply({ embeds: [embed], components: [row] });
  }

  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @returns
   */
  async chatInputRun(interaction) {
    let embed = new EmbedBuilder().setDescription(
      `Pingim : [${ms(
        Math.round(this.container.client.ws.ping)
      )}](https://google.com)`
    );
    let botunpingi = Math.round(this.container.client.ws.ping);
    if (botunpingi < 100) {
      embed.setColor(Colors.Green);
    }

    if (botunpingi > 101 && botunpingi < 249) {
      embed.setColor(Colors.Yellow);
    }

    if (botunpingi > 250) {
      embed.setColor(Colors.Red);
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ping")
        .setLabel("Yenile")
        .setStyle(ButtonStyle.Secondary)
    );
    await interaction.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = {
  _Command,
};
