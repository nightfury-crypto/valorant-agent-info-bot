const Canvas = require('canvas');
const {join} = require('path');
const {AttachmentBuilder, EmbedBuilder} = require('discord.js');

module.exports = async (message) => {
    if (message.content.toUpperCase() ===  "hello".toUpperCase()) {  
        message.reply("Hi there!")
    }
}