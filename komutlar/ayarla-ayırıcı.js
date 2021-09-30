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
.setDescription(`Kullanım: (isim ve yaş arası ayrıma simgesi)
**${prefix}ayırıcı kız simge**
**${prefix}ayırıcı erkek simge**
**${prefix}ayırıcı sıfırla ** `)
.setColor("BLUE"));

    let ayırıcı = args[1];

if(args[0]== "erkek") {
   db.set(`eayırıcı_${message.guild.id}`, ayırıcı);
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Erkek İsim Yaş Arasına  ${ayırıcı} Koyacağım`)
    .setColor("BLUE"))


}


if(args[0]== "kız") {
    db.set(`kayırıcı_${message.guild.id}`, ayırıcı);
     message.channel.send(new discord.MessageEmbed()
     .setTitle("Başarılı!")
     .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
     .setDescription(`Kız İsim Yaş Arasına  ${ayırıcı} Koyacağım`)
     .setColor("BLUE"))
 
 
 }


if(args[0] == "sıfırla") {

    if(!db.has(`eayırıcı_${message.guild.id}`)) return message.channel.send("Erkek İsim Yaş Ayırıcı ayarlanmamış ki sıfırlıyayım")
    db.delete(`eayırıcı_${message.guild.id}`)
    
  if(!db.has(`kayırıcı_${message.guild.id}`)) return message.channel.send("Kız İsim Yaş Ayırıcı ayarlanmamış ki sıfırlıyayım")
  db.delete(`kayırıcı_${message.guild.id}`)
}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: 'ayırıcı',
  description: 'İsim Ve Yaş arası ayırıcı ayarlarsın',
  usage: '',
        kategori: "ayarlama"
};