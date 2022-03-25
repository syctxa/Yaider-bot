const { Client, Message, MessageEmbed } = require("discord.js");
const { afk } = require("../../utils/etc/afk");

module.exports = {
  name: "afk",
  description: "An AFK command!",
  category: "utilidades",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const reason = args.join(" ") || "No reason!";

    afk.set(message.author.id, [Date.now(), reason]);

    message.channel.send(
      new MessageEmbed()
        .setDescription(`You have been set as AFK. \`${reason}\``)
        .setTimestamp()
        .setColor(`RANDOM`)
        .setFooter(`Mary Shop bot | Coded by ! SheepyCat#6011`)
    );
  },
};
