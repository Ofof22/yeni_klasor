const {
  InteractionHandler,
  InteractionHandlerTypes,
} = require("@sapphire/framework");
const {
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  Colors,
  ButtonBuilder,
} = require("discord.js");
const ms = require("ms");

class ButtonHandler extends InteractionHandler {
  constructor(ctx, options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button,
    });
  }

  parse(interaction) {
    if (interaction.customId !== "ping") return this.none();
    return this.some();
  }
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async run(interaction) {
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
    await interaction.update({ embeds: [embed], components: [row] });
  }
}
module.exports = {
  ButtonHandler,
};
