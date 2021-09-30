const discord = require('discord.js');
const db = require('wio.db');
const { prefix } = require('../ayarlar.json');

exports.run = async(client, message, args) => {

 

    
    if(!message.member.roles.cache.has(db.fetch(`kayıty_${message.guild.id}`))) {
        return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
     }

     let log =    db.fetch(`kayitlog_${message.guild.id}`)
     if(!log) return message.channel.send("Bu komudu kullanmak için **Kayıt Log Kanalı**  sunucuda ayarlı olması gerekiyor.")


let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))

if(args[0]) {

    if(!member) return message.channel.send("Bir kullanıcı girin.")

    let kayıt = db.fetch(`kayıt_${message.guild.id}_${member.id}`)

    if(!kayıt) return message.channel.send("Girdiğiniz kişi önceden kayıt olmamış ki Bilgilerini sileyim.")

    const narcoscode1 = new discord.MessageEmbed()
    .setDescription(`Tamamdır Dostum kişinin tüm bilgilerini sildim tekrardan kayıt edilebilir`)



    const klog = new discord.MessageEmbed()
    .setDescription(`
    Kayıt LOG Sistemi
    
 <@${message.author.id}> Tarafından ${member} isimli üyenini eski kayıtları silindi.
    
    `)



    client.channels.cache.get(log).send(klog)
    message.channel.send(narcoscode1)

 db.delete(`kayıt_${message.guild.id}_${member.id}`)
 db.delete(`kayıtisim_${message.guild.id}_${member.id}`)
 db.delete(`kayıtyas_${message.guild.id}_${member.id}`)
 db.delete(`kayitgun_${message.guild.id}_${member.id}`)
 db.delete(`cinsiyet${message.guild.id}_${member.id}`)
 db.delete(`kayteden_${message.author.id}_${member.id}`)
}



};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsil',
  description: 'Üyenini bilgilerine silersin.',
  usage: '',
        kategori: "kayıt"
};