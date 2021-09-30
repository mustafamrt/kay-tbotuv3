const discord = require('discord.js');
const db = require('wio.db');
const { prefix } = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    let rol = message.mentions.roles.first();

    
	if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new discord.MessageEmbed()
            .setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
            .setColor("BLUE")
            .setFooter( "Narcos Code Ayarlamalı Kayıt Botu", client.user.avatarURL())
        message.channel.send({embed})

}

    if (!args[0]) return message.channel.send(new discord.MessageEmbed()                                          
    .setTitle("Hata!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Kullanım: 
    **${prefix}erkekrol ayarla @erkekrol**
    **${prefix}erkekrol sıfırla **  `)
    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!rol) return message.channel.send("**Lütfen bir Rol etiketleyip tekrar deneyin.**")
     db.set(`erkekrol_${message.guild.id}`, rol.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Erkek Rolü ${rol} Olarak Ayarlandı`)
    .setColor("BLUE"))


}


if(args[0] == "sıfırla") {

    if(!db.has(`erkekrol_${message.guild.id}`)) return message.channel.send("Erkek Rol ayarlanmamış ki sıfırlıyayım")
    db.delete(`erkekrol_${message.guild.id}`)
 

}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'erkekrol',
  description: 'Erkek Rolünü ayarlarsın',
  usage: '',
        kategori: "ayarlama"
};