const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "djs",
  aliases: ["discord.js"],
  category: "utilidades",
  description: "busca docs sobre discord.js",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const searchQuery = args.slice().join(" ");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      searchQuery
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((embed) => {
        if (embed && !embed.error) {
          message.channel.send({
            embed,
          });
        } else {
          const embed2 = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `No hay nada relacionado con \`${searchQuery}\``
            );
          return message.channel.send(embed2);
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        const embed3 = new MessageEmbed()
          .setColor("BLUE")
          .setDescription("**Hubo un error :/`**");
        return message.channel.send(embed3);
      });
  },
};
