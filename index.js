require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); 

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	
	const {commandName} = interaction;
	
	if (commandName === 'ping') {
		await interaction.reply('pong!');
	}
	else if (commandName === 'group') {
		try {
			
			let options = (interaction.options._hoistedOptions);
			let optionMap = {};
			for (let i = 0; options.length > i; i += 1) {
				optionMap[options[i].name] = options[i];
			}
			
			if (optionMap['users']) {
				if (optionMap['by']) {
					
					let users = optionMap['users'].value;
					users.split(" ").join("");
					users = users.split(',').sort((a, b) => 0.5 - Math.random());
							
					let nUsers = parseInt(optionMap['by'].value);

					let nGroups = Math.trunc((users.length)/nUsers);

					let groups = [];
					for (let i = 0; i < nGroups; i++) {
						let tempgroup = []
						for (let j = 0; j < nUsers; j++) {
							let user = users.shift()
							tempgroup.push(user)
						}
						groups.push(tempgroup)
					}


					await interaction.reply("Grouping...");
					let responseString = '';
					let groupCounter = 0;
					groups.forEach( (group) => {
						responseString += `Group ${groupCounter}:`;
						group.forEach( integrant => responseString += ` ${integrant},` );
						responseString = responseString.slice(0, -1);
						responseString += '\n';
						interaction.editReply(responseString);
						groupCounter++;
					});
					if (!users.length == 0) {
						responseString += 'Extras:';
						users.forEach( integrant => responseString += ` ${integrant},` );
						responseString = responseString.slice(0, -1);
						responseString += '\n';
						interaction.editReply(responseString);
					}

					
				} else {
					throw 'Error: No users for group provided';
				}
			} else {
				throw 'Error: No users provided';
			}
			
		} catch (error) {
			interaction.reply({ content: error, ephemeral: true });
		}
	}
})

client.login(process.env.CLIENT_TOKEN);

