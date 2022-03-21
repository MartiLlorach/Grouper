const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder()
        .setName('group')
        .setDescription('Replies with the groups')
        .addStringOption( option => option.setName('users').setDescription("Enumerate the users spaced by a colon (a,b,c,...)"))
        .addStringOption( option => option.setName('by').setDescription("How many integrants per group (integer)"))
]
    .map(command => command.toJSON());

const rest = new REST({version: '9'}).setToken(process.env.CLIENT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
    .then(() => console.log('Succesfully registered application commands.'))
    .catch(console.error);