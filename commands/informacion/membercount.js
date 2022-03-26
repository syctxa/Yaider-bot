const { MessageEmbed, Discord } = require("discord.js");

module.exports = {
  name: "membercount",
  aliases: ["memberinfo"],
  description: 'Usa este comando para obtener los miembros del servidor.',
  usage: "membercount",
  category: "informacion",
  run: async (client, message, args, funcs) => {
    try {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Server Member Info")
        .setDescription(` Total Members - ${message.guild.memberCount}`);
      message.channel.send(embed);
    } catch (e) {
      console.error;
      message.channel.send(`Oh no! Un error ocurrio! ): \`${e.message}\`.`);
    }
  },
};
