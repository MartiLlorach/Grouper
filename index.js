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
					users = users.split(',').sort((a, b) => 0.5 - Math.random());
					
					console.log("users definidos");
					console.log(users)
					
					let groupOption = optionMap['by'].value;
					groupOption = groupOption.split('x');
					if (groupOption.some(isNaN)) throw 'SyntaxError: Bad group syntax';
					
					let groups = [];
					for (let nGroup=0; nGroup<groupOption[0]; nGroup++){
						let newGroup = [];
						for (let nIntegrant=0; nIntegrant<groupOption[0]; nIntegrant++){
							newGroup.push(users[0]);
							users.shift();
						}
						groups.push(newGroup);
					}

					let groupCounter = 1;

					await interaction.reply("Grouping...");
					let responseString = '';
					groups.forEach( (group) => {
						responseString += `Group ${groupCounter}:`;
						group.forEach( integrant => responseString += ` ${integrant},` );
						responseString = responseString.slice(0, -1);
						responseString += '\n';
						interaction.editReply(responseString);
						groupCounter++;
					});

					
				} else {
					throw 'Error: No groups provided';
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

