const { Client, Message, MessageEmbed } = require("discord.js");
const functions = require("../../handlers/function");
const config = require("../../config/config.json");
const distube = require("../../utils/etc/player");

module.exports = {
  name: "autoplay",
  aliases: ["ap", "randomsong"],
  useage: "autoplay",
  description: "Activa autoplay - Canciones Aleatorias similares ",
  category: "musica",
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
        "Nada reproduciendose!"
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

    //get queue
    let queue = distube.queues.get(message.guild.id)

    //if no queue return error
    if (!queue)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "No hay nada reproduciendose!"
      );

    //send info message + toggle autoplay
    await functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      `Autoplay is now **${
        distube.toggleAutoplay(queue) ? "active" : "deactive"
      }**!`
    );
  },
};
