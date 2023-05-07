const Canvas = require("canvas");
const { join } = require("path");
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "getcard",
    description: "Get information about the agent of valorant in card form",
  },

  run: async ({ interaction }) => {

    const canvas = Canvas.createCanvas(2112, 1188);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      join(__dirname, "../Images", "omencard.png")
    );

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: "testing.png",
      description: "card built."
    });

    

    const exampleEmbed = new EmbedBuilder()
    .setColor("#0099ff")
    .setImage("attachment://testing.png");

    await interaction.reply('Omen is teleporting...');
    await interaction.editReply({ embeds: [exampleEmbed], files: [attachment] });
  },
};
