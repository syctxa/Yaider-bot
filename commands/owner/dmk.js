const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "dmk",
  aliases: ["directmsg"],
  description: "manda un MD a un susario",
  category: "owner",
  useage: "",
  accessableby: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ownerid = client.config.ownerID;
    let ownerid2 = client.config.ownerid;
    if (message.author.id == ownerid || ownerid2) {
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
        user.send(msg).catch((e) => {
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
    }
}
}