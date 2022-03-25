const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");

module.exports = {
  name: "set-rules",
  aliases: ["rules"],
  description: "Set Rule For Guild Member",
  useage: "set-rules",
  category : "moderacion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let rules1 = new MessageEmbed()
      .setTitle(`General Rules`)
      .setColor(config.colors.yes)
      .setThumbnail(
        "https://media.discordapp.net/attachments/928758141993222175/942910211574882395/unknown.png"
      )
      .setDescription([
        `
        **$** ・ Prohibido contenido que interrumpa la fluidez del chat (spam-flood), sea asqueroso (gore), pornográfico, tóxico y demás.

        **$** ・Nada de publicar cookielogers, logers, scripts, virus, etc.
        
        **$** ・Cualquier intento de raideo o saturación del servidor provocará ban inmediato y reportes a Discord y Roblox que provocarán el baneo de tus cuentas.
        
        **$** ・Como imaginarás, cualquier tipo de fraude, scam o estafa no está permitido y será estrictamente sancionado.
        
        **$** ・Crear tickets con el único objetivo de molestar provocará un ban inmediato. Nos tomamos con seriedad la venta de bienes y servicios, por lo que esperamos que tú también te tomes en serio la compra.
        
        **$** ・Usá sentido común: no están permitidas acciones ilegales, obviamente prohibidas, o peligrosas para la salud.`,
      ]);

    let follow = new MessageEmbed()
      .setColor(config.colors.yes)
      .setTitle("Read all Rules Carefully")
      .setDescription(
        `Lee las reglas para evitar sanciones.`
      )
      .setImage(
        "https://media.discordapp.net/attachments/928758141993222175/942910211574882395/unknown.png"
      )
    message.channel.send(rules1)
    message.channel.send(follow).then(function (message) {
      message.react("✅");
    });
  },
};
