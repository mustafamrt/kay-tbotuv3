const discord = require('discord.js');
const db = require('wio.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

 

    
    if(!message.member.roles.cache.has(db.fetch(`kayıty_${message.guild.id}`))) {
        return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
     }



let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))

if(args[0]) {

    if(!member) return message.channel.send("Bir kullanıcı girin.")

    let kayıt = db.fetch(`kayıt_${message.guild.id}_${member.id}`)
    let isim = db.fetch(`kayıtisim_${message.guild.id}_${member.id}`)
    let yas =  db.fetch(`kayıtyas_${message.guild.id}_${member.id}`)
    let gün = db.fetch(`kayitgun_${message.guild.id}_${member.id}`)
    let c = db.fetch(`cinsiyet${message.guild.id}_${member.id}`)
    let ytk = db.fetch(`kayteden_${message.author.id}_${member.id}`)

    if(!kayıt) return message.channel.send("Girdiğiniz kişi önceden kayıt olmamış ki bilgilerini göstereyim.")

    const narcoscode = new discord.MessageEmbed()

    .setDescription(`
    ${member} Önceden kayıt olmuş işte Bilgileri

    **Kayıt olduğu isim:** ${isim}
    **Kayıt olduğu yaş:**  ${yas}
    **Kayıt olduğu tarih:** ${gün}
    **Erkek/Kız kayıt:** ${c}
    **Kayıt Eden Yetkili:** <@${ytk}>

    Bu kişiyi Tekrardan Kayıt Edebilmem için **${ayarlar.prefix}kayıtsil @kişi** şeklinde komudu kullanınız

    
    `)
    .setFooter('Narcos Code Kayıt Sistemi')

    message.channel.send(narcoscode)





}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: 'kayıtbilgi',
  description: 'Üyenini bilgilerine bakarsınız.',
  usage: '',
        kategori: "kayıt"
};