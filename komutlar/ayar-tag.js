const discord = require('discord.js');
const db = require('wio.db');
const { prefix } = require('../ayarlar.json');

exports.run = async(client, message, args) => {

 

    
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
**${prefix}tag ayarla TAG
**${prefix}tag sıfırla *** `)
.setColor("BLUE"));

    let tag = args[1];

if(args[0]== "ayarla") {
   db.set(`tag_${message.guild.id}`, tag);
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Tag ${tag} Olarak Ayarlandı`)
    .setColor("BLUE"))


}


if(args[0] == "sıfırla") {


    
  if(!db.has(`tag_${message.guild.id}`)) return message.channel.send("Tag ayarlanmamış ki sıfırlıyayım")
  db.delete(`tag_${message.guild.id}`)
}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Tag ayarlarsın',
  usage: '',
        kategori: "ayarlama"
};