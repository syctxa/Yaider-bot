module.exports = {
    name: "invert",
    aliases: ["ci"],
    category: "utilidades",
    description: "Invierte los colores de una imagen",
    usage: "[image]",
    /**
     * @param {Message} message
     */
    run: async (message) => {
        if (message.attachments.size < 0) {
            return message.channel.send(`Porfavor añade una imagen`);
        }
        message.attachments.forEach(attachment => {
            const ImageLink = attachment.proxyURL;
                let loveEmbed = new MessageEmbed()
                  .setColor("dd2e44")
                  .setTitle("Inverting...")
                  .setDescription(`Inverted image ${message.author}`)
                  .setImage(
                    `https://api.popcat.xyz/invert?image=${ImageLink}`
                  )
                  .addField(`**Image inverter**`, ship());
          
                return message.channel.send(loveEmbed);
                  });
    }
  }