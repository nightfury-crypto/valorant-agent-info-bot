const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("canvas");
const { join } = require("path");
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getagent")
    .setDescription("Get information about an agent")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the agent")
        .setRequired(true)
    ),

  run: ({ interaction }) => {
    let getname = interaction.options.getString("name");
    if (getname === null) return interaction.reply("Please enter a valid agent name")
    if (getname.toUpperCase() === "kayo".toUpperCase()) {
      getname = "kay/o"
    }

    const agent = fetch("https://valorant-api.com/v1/agents")
      .then((response) => response.json())
      .then(async (data) => {
        const onedata = data?.data?.map(async (check) => {
          if (check.displayName.toUpperCase() === getname.toUpperCase()) {
            const customembed = new EmbedBuilder()
            // embed
            .setColor(0x0099FF)
            .setTitle(`${check.displayName}`)
            .setURL('https://discord.js.org/')
            .setAuthor({ name: `${check?.role?.displayName}`, iconURL: `${check?.displayIconSmall}`})
            .setDescription(`${check?.description}`)
            .setThumbnail(`${check?.displayIcon}`)
            .addFields(  { name: '\u200B', value: '\u200B' }, 
            { name: `**🔥__ABILITIES__🔥**`, value: '\u200B'},
            )
            .addFields(
              { name: `**👉 ${check?.abilities?.[0]?.displayName}**`, value: `*${check?.abilities?.[0]?.description}*` },
              { name: `**👉 ${check?.abilities?.[1]?.displayName}**`, value: `*${check?.abilities?.[1]?.description}*` },
              { name: `**👉 ${check?.abilities?.[2]?.displayName}**`, value: `*${check?.abilities?.[2]?.description}*` },
              { name: `**👉 ${check?.abilities?.[3]?.displayName}**`, value: `*${check?.abilities?.[3]?.description}*` },
            )
            .setImage(`${check?.fullPortraitV2}`)
            .setTimestamp()
            .setFooter({ text: `${check?.developerName}`, iconURL: `${check?.killfeedPortrait}` });
            // embed ends here
            await interaction.deferReply({content: "wearing shoes.. coming" })
            await interaction.editReply({ embeds: [customembed] });
          } 
        });
      });
  },
};
