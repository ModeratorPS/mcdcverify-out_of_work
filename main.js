const Discord = require('discord.js')
const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton, GuildMember, RoleManager, GuildMemberRoleManager, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');
const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { error } = require('console');

const bot = mineflayer.createBot({
    host: `${config['mc-server-ip']}`, // minecraft server ip
    username: `${config['mc-bot-username']}`, // minecraft username
    // password: '12345678' // minecraft password, comment out if you want to log into online-mode=false servers
    //port: `00000`,                // only set if you need a port that isn't 25565
    // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
    // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
});
  
bot.on('chat', (username, message) => {
    if (message.startsWith("!verify")) {
        let args = message.split(" ") //.slice(3).join(" ").split(",")
        if (!args[1]) return bot.chat("Usage: !verify <Discord user id (Find out your user id with !id on Discord!)>")
        bot.chat(`Search ${args[1]}`)
        const successembed = new MessageEmbed()
            .setTitle("Verify-System")
            .setColor('14b82d')
            .setDescription('You have successfully linked your Minecraft account to Discord!')
        const errorembed = new MessageEmbed() //comming soon
            .setTitle("Verify-System")
            .setColor('b31919')
            .setDescription('You have already linked your Minecraft account to Discord!')
        client.guilds.fetch(`${config['dc-server-guild-id']}`).then(guild => {
            //const user = guild.members.cache.find(u => u.tag === `${args[1]}`)
            //if(!user) return bot.chat(`User ${args[1]} could not be found`);
            client.users.fetch(`${args[1]}`).then(user => {
                client.guilds.fetch(`${config['dc-server-guild-id']}`).then(guild => {
                    let roleName2 = `${config['dc-server-role-name']}`;
                    const role2 = guild.roles.cache.find(x2 => x2.name === roleName2);
                    const requirerole = role2.id
                    guild.members.cache.filter(n => n.user.id = `${args[1]}`).forEach(member => member.roles.add(requirerole))
                })
                user.send({
                    embeds: [successembed]
                })
                bot.chat(`${args[1]} verifyed!`)
            }).catch(err => {
                console.error(err)
                bot.chat("User not found!")
            })
        })
    }
});

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
