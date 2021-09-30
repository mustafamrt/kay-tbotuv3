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
    **${prefix}kayıtsızrol ayarla @misafir**
    **${prefix}kayıtsızrol sıfırla ** `)
    .setColor("BLUE"));


 

if(args[0] == "ayarla") {

    if (!rol) return message.channel.send("**Lütfen bir Rol etiketleyip tekrar deneyin.**")
     db.set(`misafir_${message.guild.id}`, rol.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Kayıtsız Rolü ${rol} Olarak Ayarlandı`)
    .setColor("BLUE"))


}

if(args[0] == "sıfırla") {


    
   if(!db.has(`misafir_${message.guild.id}`)) return message.channel.send("Kayıtsız Rol ayarlanmamış ki sıfırlıyayım")
   db.delete(`misafir_${message.guild.id}`)
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsızrol',
  description: 'Kayıtsız Rolünü ayarlarsın',
  usage: '',
        kategori: "ayarlama"
};