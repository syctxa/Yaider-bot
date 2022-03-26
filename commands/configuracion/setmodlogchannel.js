const { Client, Message, MessageEmbed } = require("discord.js");
const Guild = require("../../utils/models/mod-log"); //require our log model
const mongoose = require("mongoose");

module.exports = {
  name: "setlogchannel",
  aliases: ["setm", "sm", "smc", "setmodlog"],
  category: "configuracion",
  description: "Configura un canal donde se mandaran los registros de moderacion",
  usage: "[channel mention | channel ID | channel name]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel
        .send("No tienes permiso para usar este comando.")
        .then((m) => m.delete({ timeout: 5000 })); // if the user does not have perms

    const channel = await message.mentions.channels.first();
    if (!channel)
      return message.channel
        .send(
          "No puede encontrar ese canal. Porfavor mencione un canal valido en el servidor."
        ) // if the user do not mention a channel
        .then((m) => m.delete({ timeout: 5000 }));

    let webhookid;
    let webhooktoken;
    await channel
      .createWebhook("Yaider lOGGER", {
        avatar: message.guild.iconURL({ format: "png" }),
      })
      .then((webhook) => {
        webhookid = webhook.id;
        webhooktoken = webhook.token;
      });

    await Guild.findOne(
      //will find data from database
      {
        guildID: message.guild.id,
      },
      async (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          // what the bot should do if there is no data found for the server
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            logChannelID: channel.id,
            webhookid: webhookid,
            webhooktoken: webhooktoken,
          });

          await newGuild
            .save() //save the data to database(mongodb)
            .then((result) => console.log(result))
            .catch((err) => console.error(err));

          return message.channel.send(
            `El canal de registros es ${channel}`
          );
        } else {
          guild
            .updateOne({
              //if data is found then update it with new one
              logChannelID: channel.id,
              webhooktoken: webhooktoken,
              webhookid: webhookid,
            })
            .catch((err) => console.error(err));

          return message.channel.send(
            `El canal de registros ahora es ${channel}`
          );
        }
      }
    );
  },
};
