const { Client, Message, MessageEmbed } = require("discord.js");
const functions = require("../../handlers/function");
const config = require("../../config/config.json");
const distube = require("../../utils/etc/player");

module.exports = {
  name: "pause",
  aliases: ["break"],
  category: "musica",
  useage: "pause",
  description: "Pauses the song*",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "Nothing playing!"
      );

    //if member not connected return error
    if (!message.member.voice.channel)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + " Necesitas estar en un canal de voz"
      );

    //if they are not in the same channel, return error
    if (message.member.voice.channel.id != message.guild.me.voice.channel.id)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" +
          message.author.tag +
          "`" +
          " Debes estar en el mismo canal de voz que yo: " +
          ` \`${
            message.guild.me.voice.channel.name
              ? message.guild.me.voice.channel.name
              : ""
          }\``
      );
        let queue = distube.getQueue(message)
    //if Bot is paused, return error
    if (queue.paused)
      return functions.embedbuilder(
        client,
        "null",
        message,
        config.colors.no,
        "Already paused!"
      );

    //send information message
    functions.embedbuilder(client, 3000, message, config.colors.yes, "Paused!");

    //pause
    return distube.pause(message)
  },
};
