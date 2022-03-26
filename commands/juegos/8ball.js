const { Client, Message, MessageEmbed } = require("discord.js");

const reactions = ["🤔", "😅", "😀", "😐"];
const answers = [
  "Si.",
  "No.",
  "Mary dice que si.",
  "podria ser.",
  "no lo se",
  "probablemente",
  "Todo apunta a que si.",
  "Definitivamente",
  "Absolutamente",
  "Nope.",
  "no gracias, no podre hacerlo.",
  "No ha forma!",
  " es cierto.",
  "Esta decidido.",
  "Without a doubt.",
  "Si - definitivamente.",
  "You may rely on it.",
  "Lo veo, si.",
  "no lo se, escoje por ti mismo, tengo sueño",
  "Que hay de ti?",
  "Hmm... Creo que si",
  "Hmm... Creo que No",
];

module.exports = {
  name: "8ball",
  aliases: [""],
  description: "Juega 8ball en Discord",
  usage: "",
  category : "juegos",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const question = args.join(" ");
    if (!question)
      return message.channel.send("**🥱 - No me preguntaste nada, ¿asi como? ¿respondo aire? .**");
    const botans = new MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setTitle(`8ball`)
      .setDescription(
        `${
          message.author
        } Me pregunto: \n\`${question}?\` \nMi respuesta es: \n**${
          reactions[Math.floor(Math.random() * reactions.length)]
        } - ${answers[Math.floor(Math.random() * answers.length)]} !**`
      )
      .setTimestamp();
    message.channel.send(botans).then(() => message.delete());
  },
};
