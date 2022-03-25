const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warns",
  aliases: ["dhamkiya"],
  description: "Get the warnings of yours or mentioned person",
  useage: "warns <user>",
  category : "moderacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(
            "**You Dont Have The Permissions To Warn Users! - [MANAGE_MESSAGES]**"
          )
          .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
      );
    }

    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(
            "**Please Mention the person to who you want to Show Warns - warns @mention **"
          )
          .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription("**You can not Check The warns of bots**")
          .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
      );
    }

    const reason = args.slice(1).join(" ");

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;
    message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription(
          `** ${user.user.username} Have ${warnings} warning's **`
        )
        .setFooter("Mary Shop bot | Coded by ! SheepyCat#6011")
    );
  },
};
