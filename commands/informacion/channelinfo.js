const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelinfo",
  aliases: ["ci", "channeli", "cinfo"],
  category : "informacion",
  description: "Muestra informacion del canal",
  usage: "[ channel mention | channel name | ID] (optional)",
  accessableby: "everyone",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let channel =
      message.mentions.channels.first() ||
      client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
      message.guild.channels.cache.find(
        (r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.channel;
    if (!channel) return message.channel.send("**Canal no encontrado!**");

    let channelembed = new MessageEmbed()
      .setTitle(`Informacion del canal ${channel.name}`)
      .setThumbnail(message.guild.iconURL())
      .addField("**NSFW**", channel.nsfw, true)
      .addField("**Channel ID**", channel.id, true)
      .addField("**Channel Type**", channel.type)
      .addField(
        "**Descripcion del canal**",
        `${channel.topic || "Sin descripcion"}`
      )
      .addField("**Canal creado en**", channel.createdAt)
      .setColor("GREEN");
    message.channel.send(channelembed);
  },
};
