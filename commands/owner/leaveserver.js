const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "leaveserver",
  aliases: ["lvs"],
  description: "el bot puede abandonar un server",
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
    if (!message.author.id === ownerid || ownerid2) {
        return message.channel
          .send(
            new MessageEmbed()
              .setColor("RED")
              .setAuthor(message.author.tag)
              .setDescription(
                "**No eres el dueño del Bot!**"
              )
              .setFooter(client.botconfig.footertext)
          )
          .then((msg) => {
            msg.delete({ timeout: 10000 });
          });
    }

    const guildId = args[0];

    if (!guildId)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription("**Porfavor provee un ID de un servidor **")
            .setFooter(client.botconfig.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });

    const guild = client.guilds.cache.find((g) => g.id === guildId);

    if (!guild)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription("** No se encontro ese servidor! **")
            .setFooter(client.botconfig.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });
    let leaved = await guild.leave();
    if (leaved) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`Servidor Abandonado: **${guild.name}**`)
          .setFooter(client.botconfig.footertext)
      );
    } else {
      message.channel.send("No puedo....");
    }
  },
};
