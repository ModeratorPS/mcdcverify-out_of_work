const Discord = require('discord.js')
const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton, GuildMember, RoleManager, GuildMemberRoleManager, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');
const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { error } = require('console');
const hostn = config['mc-bot-ip'];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


const bot = mineflayer.createBot({
    host: `${hostn}`,
    username: `${config['mc-bot-username']}`,
    //port: `51553`,                // only set if you need a port that isn't 25565
});
  
bot.on('chat', (username, message) => {
    if (message.startsWith("!verify")) {
        let args = message.split(" ")
        if (!args[1]) return bot.chat("Usage: !verify <Discord user id (Find out your user id with !id on Discord!)>")
        bot.chat(`Search ${args[1]}`)
        const successembed = new MessageEmbed()
            .setTitle("Verify-System")
            .setColor('14b82d')
            .setDescription('You have successfully linked your Minecraft account to Discord!')
        const unlinkbutton = new MessageActionRow()
            .addComponents(
            new MessageButton()
                .setStyle("SUCCESS")
                .setCustomId("unlink")
                .setLabel("Unlink")
            )
        client.guilds.fetch(`${config['dc-server-guild-id']}`).then(guild => {
            client.users.fetch(`${args[1]}`).then(user => {
                client.guilds.fetch(`${config['dc-server-guild-id']}`).then(guild => {
                    let roleName2 = `${config['dc-server-role-name']}`;
                    const role2 = guild.roles.cache.find(x2 => x2.name === roleName2);
                    const requirerole = role2.id
                    guild.members.cache.filter(n => n.user.id = `${args[1]}`).forEach(member => member.roles.add(requirerole))
                })
                bot.chat(`${args[1]} verifyed!`)
                user.send({
                    embeds: [successembed],
                    components: [unlinkbutton]
                })
            }).catch(err => {
                console.error(err)
                bot.chat("User not found!")
            })
        })
    }
});

client.on('interactionCreate', interaction => {
    if (interaction.isButton()) {
        if (interaction.customId === "unlink") {
            const unverifyembed = new MessageEmbed()
                .setTitle("Verify-System")
                .setColor('b31919')
                .setDescription('You have unlinked your Minecraft account to Discord!')
            const unlinkbuttonused = new MessageActionRow()
                .addComponents(
                new MessageButton()
                    .setStyle("DANGER")
                    .setCustomId("delmes")
                    .setLabel("Unlinked")
                    .setDisabled(true)
                )
            const unlinkbuttonused2 = new MessageActionRow()
                .addComponents(
                new MessageButton()
                    .setStyle("SECONDARY")
                    .setCustomId("delmes1")
                    .setLabel("Klick to delete")
                )
            client.guilds.fetch(`${config['dc-server-guild-id']}`).then(guild => {
                client.users.fetch(`${interaction.user.id}`).then(user => {
                    client.guilds.fetch(`${config['dc-server-guild-id']}`).then(guild => {
                        let roleName2 = `${config['dc-server-role-name']}`;
                        const role2 = guild.roles.cache.find(x2 => x2.name === roleName2);
                        const requirerole = role2.id
                        guild.members.cache.filter(n => n.user.id = `${interaction.user.id}`).forEach(member => member.roles.remove(requirerole))
                        interaction.message.edit({
                            embeds: [unverifyembed],
                            components: [unlinkbuttonused, unlinkbuttonused2]
                        })
                    })
                }).catch(err => {
                    console.error(err)
                })
            })
        } else if (interaction.customId === "delmes1") {
            interaction.message.delete()
        }
    }
})

client.once('ready', () => {
    console.log('The Client is Ready!')
    client.user.setActivity({name: `${config['dc-bot-activity']}`, type: "PLAYING"})
});

client.on('messageCreate', message => {
    if (message.content.startsWith("!id")) {
        const idembed = new MessageEmbed()
            .setTitle("Your Discord ID:")
            .setDescription("> " + message.author.id)
            .setColor("cdb73c")
        message.reply({
            embeds: [idembed]
        })
    }
})

client.login(config['dc-bot-token']);
