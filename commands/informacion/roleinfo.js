const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "role",
  aliase: ["rl", "roleinfo"],
  description: "Obten informacion de un rol",
  usage: `prefix <role>`,
  category : "informacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let role;
    if (args[0] && isNaN(args[0]) && message.mentions.roles.first())
      role = message.mentions.roles.first();
    if (args[0] && isNaN(args[0]) && !message.mentions.roles.first()) {
      role = message.guild.roles.cache.find(
        (e) =>
          e.name.toLowerCase().trim() ==
          args.slice(0).join(" ").toLowerCase().trim()
      );

      if (
        !message.guild.roles.cache.find(
          (e) =>
            e.name.toLowerCase().trim() ==
            args.slice(0).join(" ").toLowerCase().trim()
        )
      )
        return message.reply(":x: Rol no encontrado");
    }
    if (args[0] && !isNaN(args[0])) {
      role = message.guild.roles.cache.find((e) => e.id == args[0]);
      if (!message.guild.roles.cache.has(args[0]))
        return message.reply(":x: Rol no encontrado");
    }

    if (!role) return message.reply("Tienes que mencionar un rol");
    let rolemembers;
    if (role.members.size > 20)
      rolemembers =
        role.members
          .map((e) => `<@${e.id}>`)
          .slice(0, 20)
          .join(", ") + ` y ${role.members.size - 20} Mas miembros...`;
    if (role.members.size < 20)
      rolemembers = role.members.map((e) => `<@${e.id}>`).join(", ");

    let embed = new MessageEmbed()
      .setColor(role.color)
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription(
        `**Nombre del rol:** ${role.name}(<@&${role.id}>)\n\n
            **Role ID:** **\`${role.id}\`**\n\n
            **Rol Mencionable:** ${role.mentionable
              .toString()
              .replace("true", "Si")
              .replace("false", "No")}\n\n**Tamaño de los miembros del rol:** ${
          role.members.size || 0
        }`
      )
      .addField("Role Members;", rolemembers || "Not Found");

    message.channel.send(embed);
  },
};
