const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "hack",
  aliases: ["fakehack"],
  category: "utilidades",
  description: "finje un hackeo falso",
  useage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var ips = [
      "10.313.523.502.00.1",
      "25.537.753.462.29.2",
      "21.175.866.974.07.08",
      "32.653.587.825.35.5",
      "12.172.764.781.22.8",
      "91.723.242.452.09.3",
      "92.743.116.896.85.6",
      "84.091.000.853.54.7",
      "51.071.124.129.12.0",
      "177.143.58.825.35.5"
    ];
    var ipadress = ips[Math.floor(Math.random() * ips.length)];

    if (!args[0])
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription("**A quien quieres hackear?\nTag Porfavor**")
          .setFooter(client.botconfig.footertext)
      );
    const Hacking = args.slice(0).join(" ") && args.shift().toLowerCase();

    let msg = await message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription(`**Hackeando a ${Hacking}**`)
        .setFooter(client.botconfig.footertext)
    );
    let time = 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▖] Buscando email de discord ${Hacking}... `)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▘] Mail: ${Hacking}@gmail.com`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▝] Obteniendo contraseña del usuario`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▗] Contraseña:`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▖]Obteniendo acceso a la cuenta...`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▘] Collecting data...  `)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(
            `[▝] Hacking all accounts linked to ${Hacking}@gmail.com....`
          )
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▗] Buscando direccion IP...`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▖] Ip: ${ipadress}`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▘] Informacion recolectada...`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▝] Descargando virus  `)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription(`[▗]Destruyendo lista de amigos`)
          .setFooter(client.botconfig.footertext)
      );
    }, time);
    time += 15000;
    setTimeout(function () {
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription(`[▖] Obteniendo resultados...`)
        .setFooter(client.botconfig.footertext);
    }, time);
    time += 15000;
    setTimeout(function () {
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription(
          `El usuario ${Hacking} ha sido hackeado por ${message.author.tag} jeje`
        )
        .setFooter(client.botconfig.footertext);
    }, time);
    time += 3 * 1000;
  },
};
