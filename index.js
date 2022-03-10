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
    let options = (interaction.options._hoistedOptions);
    let optionMap = {};
    for (let i = 0; options.length > i; i += 1) {
      optionMap[options[i].name] = options[i];
    }

    if (optionMap['users']) {
      if (optionMap['by']) {

        let round = false;
        if (optionMap['round']){
          round = optionMap['round'].value;
        }

        let users = optionMap['users'].value;
        users = users.split(',').sort((a, b) => 0.5 - Math.random());

        let groupOptions = optionMap['by'].value;

        groupOptions = groupOptions.split('+');
        groupOptions = groupOptions.filter( entry => entry.trim() != '' );
        
        let cont = 0;
        groupOptions.forEach( (groupOption) => {
          groupOption = groupOption.split('*');
          groupOptions[cont] = groupOption.filter( entry => entry.trim() != '' );
          cont++;
        });

      let groups;
      let userCount = 0;
      if (!round){
        groupOptions.forEach( (groupOption) => {
          for (let i = 0; i < groupOption[0]; i++) {
            if (userCount >= users.length) break;
            let newGroup;
            for (let j = 0; j < groupOption[1]; j++) {
              if (userCount >= users.length) break;
              newGroup.push(users[userCount]);
              userCount++;
            }
            groups.push(newGroup);
          }
        });
        let groupCounter = 1;
        groups.forEach( (group) => {
          let groupString = `GROUP ${groupCounter}:`;
          group.forEach( integrant => groupString+= ` ${integrant},`);
          groupString = groupString.slice(0, -1);
          if (groupCounter == 1){
            interaciotn.reply(groupString);
          } else {
            interaction.followUp(groupString);
          }
          groupCounter++;
        });
      } else {
        await interaction.reply('WARNING: round functionality is in progress')
      }
        

      } else {
        await interaction.reply('ERROR: no groups provided')
      }
    } else {
      await interaction.reply('ERROR: no users provided');
    }
  }
})

client.login(process.env.CLIENT_TOKEN);

