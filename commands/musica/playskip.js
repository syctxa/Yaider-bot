const { Client, Message, MessageEmbed } = require("discord.js");
const functions = require("../../handlers/function");
const config = require("../../config/config.json");
const distube = require("../../utils/etc/player");

module.exports = {
  name: "playskip",
  aliases: ["ps"],
  useage: "playskip <URL/NAME>",
  category: "musica",
  description: "Plays new song and skips current",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    //if member not connected return error
    if (!message.member.voice.channel)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + " Necesitas estar en un canal de voz"
      );

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id != message.guild.me.voice.channel.id
    )
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

    //if no args return error
    if (!args[0])
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" +
          message.author.tag +
          "`" +
          " Añade algo que quieras buscar"
      );

    //if not allowed to CONNECT to the CHANNEL
    if (
      !message.guild.me
        .permissionsIn(message.member.voice.channel)
        .has("CONNECT")
    )
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" +
          message.author.tag +
          "`" +
          " No estoy peritido en unirme a tu canal"
      );

    //If bot not connected, join the channel
    if (!message.guild.me.voice.channel)
      message.member.voice.channel.join().catch((e) => {
        //send error if not possible
        return functions.embedbuilder(
          client,
          5000,
          message,
          config.colors.no,
          "`" +
            message.author.tag +
            "`" +
            " No estoy peritido en unirme a tu canal"
        );
      });

    //if not allowed to CONNECT to the CHANNEL
    if (
      !message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")
    )
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" +
          message.author.tag +
          "`" +
          " No estoy peritido en hablar a tu canal"
      );

    //if bot not connected use play
    if (!message.guild.me.voice.channel) {
      //send information msg
      functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.yes,
        "Buscando!",
        "```" + args.join(" ") + "```"
      );
      //return + play the track
      return client.distube.play(message, args.join(" "));
    }

    //send information message
    functions.embedbuilder(
      client,
      5000,
      message,
      config.colors.yes,
      "Buscando y SALTANDO!",
      "```" + args.join(" ") + "```"
    );
    //use the distube pkg to play and skip
    return distube.play(message, args.join(" "), {
      skip: true,
    });
  },
};
