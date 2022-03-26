const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("../../utils/models/boost");

module.exports = {
  name: "setboostchannel",
  aliases: ["setbc", "setboostchannel", "setboostc"],
  category: "configuracion",
  description: "Configura el canal para mejoras!!",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.lineReply(
        "No tienes los permisos suficientes para usar el comando!"
      );

    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);

    if (!channel) return message.lineReply("Porfafor provee un canal!");

    await db.findOne({ guild: message.guild.id }, async (err, data) => {
      if (!data) {
        data = new db({
          guild: message.guild.id,
          channel: channel.id,
        }).save();
        message.channel.send(
          `El canal de mensajes de mejoras es ${channel}!`
        );
      } else {
        data.channel = channel.id;
        await db.findOneAndUpdate({ guild: message.guild.id });
        message.channel.send(
          `El canal de mensajes de mejoras es ${channel}!`
        );
      }
    });
  },
};
