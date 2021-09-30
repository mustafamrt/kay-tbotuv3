const Discord = require('discord.js');
const db = require('wio.db');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    message.guild.members.cache.filter(erkek => (db.fetch(`erkekrol_${message.guild.id}`))).size
    message.guild.members.cache.filter(kız => (db.fetch(`kızrol_${message.guild.id}`))).size

    const say = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayColor)
    .setTitle(message.guild.name)
        .addField(`👥 Sunucudaki Kayıtlı Erkek Üye Sayısı ${erkek}`)
        .addField(`👥 Sunucudaki Kayıtlı Kız Üye Sayısı ${kız}`)

    message.channel.send(say);


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};

exports.help = {
    name: 'gelişmiş-say',
    description: 'Gelişmiş sayaç sistemi',
    kategori: "kayıt"
 }