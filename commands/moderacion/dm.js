const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dm",
  aliases: ["senddm"],
  description: "DM the mentioned user",
  usage: "dm [message]",
  category : "moderacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send("No tienes permisos de user este comando")
    }
    let msg = args.slice(1).join(" ");
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(
            "You must mention someone or provide a valid UserID for me to dm them."
          )
          .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
      );

    if (msg.length < 1) msg = "Blank message. . .";

    const embed = new MessageEmbed()
      .setColor(Math.floor(Math.random() * 16777215))
      .setTimestamp()
      .setTitle(`You have a new message from ${message.author.username}!`)
      .setAuthor(message.author.tag)
      .setThumbnail(user.displayAvatarURL())
      .addField(
        "Remember:",
        `Do not reply to me because ${message.author.username} will not recieve the reply, take your stuff to their dms instead :)`
      )
      .addField(`${message.author.username}'s message:`, msg)
      .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011");
    user.send({ embed }).catch((e) => {
      if (e) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setAuthor(user.tag)
            .setDescription("That user unfortunately locked their DMs")
            .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
        );
      } else {
        message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setAuthor(user.tag)
            .setDescription("Successfully sent your message")
            .then((message) => {
              message.delete(1500);
            })
            .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
        );
      }
    });
  },
};
