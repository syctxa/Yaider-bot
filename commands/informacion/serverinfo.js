const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

// variables
const filterLevels = {
  DISABLED: "Off",
  MEMBERS_WITHOUT_ROLES: "No Role",
  ALL_MEMBERS: "Everyone",
};

const verificationLevels = {
  NONE: "Ninguna",
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "(╯°□°）╯︵ ┻━┻",
  VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};

const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydeny: "Sydeny",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South",
};

module.exports = {
  name: "serverinfo",
  aliases: ["sinfo"],
  description: "Muestra informacion acerca del servidor",
  usage: "serverinfo",
  category : "informacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guild } = message;
    const icon = message.guild.iconURL(); // Icon Of Server
    // const roles = message.guild.roles.cache.map(e => e.toString()) // Roles Of Server
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);

    let rolesdisplay;
    if (roles.length < 200) {
      rolesdisplay = roles.join(" ");
    } else {
      rolesdisplay = roles.slice(200).join(" ");
    }
    const emojis = message.guild.emojis.cache.map((e) => e.toString()); // Emojis Of Server
    const emojicount = message.guild.emojis.cache;

    message.channel
      .send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription(`Obteniendo informacion del servidor...`)
      )
      .then((msg) => {
        msg.edit(
          new MessageEmbed()
            .setColor("RED")
            .setTitle("Informacion del servidor")
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`El nombre de este servidor es  \`\`${message.guild.name}\`\``)
            .addField("**Dueño del servidor:**", `${message.guild.owner}`, true)
            .addField("Region del  servidoe", message.guild.region, true)
            .addField("**Miembros del servidor:**", `${message.guild.memberCount}`, true)
            .addField(
              "``Nivel de verificacion``",
              verificationLevels[message.guild.verificationLevel],
              true
            )
            .addField(
              "``Canal de reglas``",
              message.guild.rulesChannel
                ? `${message.guild.rulesChannel}`
                : "`None`",
              true
            )
            .addField("Mejoras:-", guild.premiumSubscriptionCount)
            .addField("Nivel del servidor:-", guild.premiumTier)
            .addField(
              "Status del server:-",
              `${
                guild.channels.cache.filter((channel) => channel.type == "text")
                  .size
              }⌨️\n${
                guild.channels.cache.filter(
                  (channel) => channel.type == "voice"
                ).size
              }🔈\n${
                guild.channels.cache.filter((channel) => channel.type == "news")
                  .size
              }📢\n${
                guild.channels.cache.filter(
                  (channel) => channel.type == "category"
                ).size
              }📁`
            )
            .addField(
              "Emojis del servidor:-",
              `${emojicount.size}\n${
                emojicount.filter((emoji) => !emoji.animated).size
              }(No animados)\n${
                emojicount.filter((emoji) => emoji.animated).size
              }(Animados)`
            )
            .addField(
              "**Total de usuarios**",
              message.guild.members.cache.filter((member) => !member.user.bot)
                .size,
              true
            )
            .addField(
              "**Total de bots**",
              message.guild.members.cache.filter((member) => member.user.bot)
                .size,
              true
            )
            .addField(
              "**Total de Canalels**",
              message.guild.channels.cache.size,
              true
            )
            .addField(
              "**Total de canales de texto**",
              message.guild.channels.cache.filter((ch) => ch.type === "text")
                .size,
              true
            )
            .addField(
              "**Total de canales de voz**",
              message.guild.channels.cache.filter((ch) => ch.type === "voice")
                .size,
              true
            )
            .addField(
              "**Creado en**",
              message.guild.createdAt.toLocaleString(),
              true
            )
            .addField(
              "**Roles**",
              message.guild.roles.cache.size.toString(),
              true
            )
            .setFooter(client.botconfig.footertext)
        );
      });
  },
};
