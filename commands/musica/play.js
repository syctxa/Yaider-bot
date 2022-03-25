const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/bot.json");
const config = require("../../config/config.json");
const distube = require("../../utils/etc/player");

module.exports = {
  name: "play",
  aliases: ["p"],
  description: "",
  category: "musica",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    // if member not join channel
    if (!channel)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.colour)
            .setTitle(`Buscando cancion`)
            .setDescription(`🎶 Unete a un canal de voz primero..`)
            .setFooter(config.footertext)
        )
        .then((msg) => {
          msg.delete({
            timeout: 5000,
          });
        });
    let search = args.join(" ");

    if (!search) {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.colour)
            .setTitle(`Dame el nombre de la cancion o el link`)
            .setFooter(config.footertext)
        )
        .then((msg) => {
          msg.delete({
            timeout: 5000,
          });
        });
    } else {
      message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.colour)
            .setTitle(`Buscando Cancion`)
            .setDescription(
              `🎶  Estoy buscando tu cancion, Hehe!!\`\`\`${search}\`\`\``
            )
            .setFooter(config.footertext)
        )
        .then((msg) => {
          msg.delete({
            timeout: 5000,
          });
        });
      distube.play(message, search);
    }
  },
};
