const { MessageEmbed, Message, Client } = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageMenu,
  MessageMenuOption,
} = require("discord-buttons");
const { readdirSync } = require("fs");
const { prefix } = require("../..");
let color = "#36393f";

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows all available bot commands.",
  category: "informacion",
  /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 

     */
  run: async (client, message, args) => {
    let ownerid = client.config.ownerID;
    let ownerid2 = "892860271675211819";
    const emo = {
      juegos: "🎮",
      configuracion: "⚙️",
      automod: "👍",
      sorteos: "🎉",
      informacion: "📻",
      moderacion: "🔨",
      musica: "🎵",
      owner: "👑",
      leveling: "🎂",
      rr_roles: "🙌",
      ticket: "🎫",
      utilidades: '☄️',
      welcome_leave: "✨",
      rr_roles: "🎁",
      yt_poster: "📺",
      sellers: "💵"
    };

    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`lista de comandos Comandos`)
        .addField(
          "Informacion del prefijo",
          `Prefix: \`${prefix}\`\npuedes mencionar ${client.user} para obtener informacion del prefijo.`,
          false
        )
        .addField(
          "• Developer",
          `\`\`\`yml\nName: ! SheepyCat#6011 [892860271675211819]\`\`\``
        )
        .setTimestamp();

      let data = client.categories.map((cat) => {
        return {
          label: `${cat[0].toUpperCase() + cat.slice(1)}`,
          value: cat,
          emoji: emo[cat],
          description: `Ve la lista de comandos para ${cat}`,
        };
      });
      if (
        !message.member.permissions.has("MANAGE_MESSAGES") &&
        !message.member.roles.cache.some((r) => r.name === "Giveaways") &&
        !message.member.permissions.has("ADMINISTRATOR")
      ) {
      delete data[7]
      }
      if(!message.member.roles.cache.some((r) => r.name === "Vendedores") && !message.member.permissions.has("ADMINISTRATOR")) {
        delete data[6]
      }
      if(!message.member.permissions.has("MANAGE_CHANNELS") && !message.member.permissions.has("ADMINISTRATOR")) {
        delete data[8]
      }
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        delete data[0]
      }
      if (!message.member.permissions.has("MANAGE_GUILD") && !message.member.permissions.has("ADMINISTRATOR")) {
        delete data[10]
      }
      if (!message.member.permissions.has("MANAGE_ROLES") && !message.member.permissions.has("ADMINISTRATOR")) {
        delete data[3]
      }
      if (!message.author.id === ownerid || ownerid2) {
        delete data[5]
      }
      let menu = new MessageMenu()
        .setID("help-menu")
        .setPlaceholder(`Da click para ver mi categoria`)
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(data);
      let raw = new MessageActionRow().addComponents(menu);
      let btn = new MessageButton()
        .setID("home")
        .setLabel(`Home`)
        .setStyle("blurple")
        .setEmoji("🏘️");
      let msg = await message.channel.send({
        embed: embed,
        buttons: btn,
        components: raw,
      });
      client.on("clickButton", async (button) => {
        if (button.id === "home") {
          await button.reply.defer().catch((e) => {});
          msg.edit(embed).catch((e) => {});
        }
      });
      client.on("clickMenu", async (menu) => {
        if (menu.id === "help-menu") {
          await menu.reply.defer().catch((e) => {});
          if (menu.clicker.user.id === message.author.id) {
            let [directory] = menu.values;

            let aa = new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(` ✅  todos los comandos para **${directory}** ✅`)
              .setDescription(
                `>>> ${client.commands
                  .filter((cmd) => cmd.category === directory)
                  .map((cmd) => {
                    return [`\`${cmd.name}\``].join(" ");
                  })
                  .join(" ' ")}`
              )
              .setFooter(
                `Mary Shop Bot`,
                message.author.displayAvatarURL({ dynamic: true })
              );

            msg.edit(aa);
          }
        }
      });
    } else {
      let cots = [];
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = client.commands.get(name).description;

          let obj = {
            cname: `\`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      // console.log(cots);

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } Commands!__`
          )
          .setDescription(
            `Usa \`${prefix}help\` seguido de un comando para obtener mas informacion sobre este\nPor ejemplo: \`${prefix}help ping\`.\n\n`
          )
          .addFields(catts)
          .setColor(color)
          .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
          .setColor("RANDOM")
          .setFooter(`Mary Shop bot | Coded by ! SheepyCat#6011`);

        return message.channel.send(combed);
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send(embed, {
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
