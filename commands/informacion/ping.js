const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["api"],
  description: "Obtener el ping del bot..",
  useage: "ping",
  category : "informacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ping = new MessageEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag)
      .setTitle(`🎈 Ping : ${client.ws.ping}ms`)
      .setFooter("Mary Shop Bot | by ! SheepyCat#6011");
    message.channel.send(ping);
  },
};
