const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: ["jabsdk"],
  description: "Bans a Member from a Guild",
  usage: "ban @User",
  category : "moderacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS") && !message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(
            "**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
          )
          .setFooter(client.botconfig.footertext)
      );

    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember) {
      const missingArgs = new MessageEmbed()
        .setColor("RED")
        .setTitle("Missing arguments")
        .setDescription(
          `
                                **Name** : ban\n
                                **Description** :Bans a Member from a Guild\n
                                **aliases** : jabsdk\n
                                **usage**: ban <@user/ID> [reason]\n `
        )
        .setFooter(client.botconfig.footertext)
        .setTimestamp();
      return message.channel.send(missingArgs);
    }
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "no reason";

    if (!message.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.reply(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription("I dont have the permissions to ban users!")
          .setFooter(client.botconfig.footertext)
      );

    let Sembed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(banMember.user.tag)
      .setFooter(client.botconfig.footertext)
      .setThumbnail(banMember.user.displayAvatarURL())
      .setDescription(
        `> Has sido banneado de ${message.guild.name} por ${reason}.\nAppeals: ${client.botconfig.ban_appeal}`
      );
    let i = 0;
    banMember.send(Sembed).catch((err) => console.log(err.toString().red));
    banMember
      .ban(banMember, reason)
      .catch((err) => {
        console.log(err.toString().red);
        i++;
      })
      .then(() => {
        let embed = new MessageEmbed()
          .setColor("RED")
          .setAuthor(banMember.user.tag)
          .setFooter(client.botconfig.footertext)
          .setThumbnail(banMember.user.displayAvatarURL())
          .setDescription(`✅ **${banMember.user.tag}** successfully banned!`);
        if (i == 1) return message.reply("MISSING PERMISSIONS TO BAN HIM!");
        message.reply(embed).then((msg) => {
          msg.delete({ timeout: 10000 });
        });
      });
  },
};
