const Discord = require("discord.js");
const db = require('wio.db');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {
  const narcosmisafir = db.fetch(`misafir_${message.guild.id}`); 
  const nkızkayıt = db.fetch(`kızrol_${message.guild.id}`); 

  const tag = db.fetch(`tag_${message.guild.id}`); //tagınız

  var toplam = db.fetch(`erkekkayıtstats_${message.author.id}.${message.guild.id}`)
  var toplam2 = db.fetch(`kızkayıtstats_${message.author.id}.${message.guild.id}`)
 


    let kayıtsız =    db.fetch(`misafir_${message.guild.id}`)
    let kızrol =    db.fetch(`kızrol_${message.guild.id}`)
    let kayıtl =    db.fetch(`klog_${message.guild.id}`)
    let kyetkili =    db.fetch(`kayıty_${message.guild.id}`)
    let tagayar =    db.fetch(`tag_${message.guild.id}`)
    let log =    db.fetch(`kayitlog_${message.guild.id}`)
    let ayırıcı =    db.fetch(`kayırıcı_${message.guild.id}`)
    if(!kayıtsız) return message.channel.send("Bu komudu kullanmak için **Kayıtsız Rol** sunucuda ayarlı olması gerekiyor.")
    if(!kızrol) return message.channel.send("Bu komudu kullanmak için **Kız Rol** sunucuda ayarlı olması gerekiyor.")
    if(!kayıtl) return message.channel.send("Bu komudu kullanmak için **Kayıt Log** sunucuda ayarlı olması gerekiyor.")
    if(!kyetkili) return message.channel.send("Bu komudu kullanmak için **Kayıt Yetkilisi** Rolü sunucuda ayarlı olması gerekiyor.")
    if(!tagayar) return message.channel.send("Bu komudu kullanmak için **Tag** sunucuda ayarlı olması gerekiyor.")
    if(!log) return message.channel.send("Bu komudu kullanmak için **Kayıt Log Kanalı**  sunucuda ayarlı olması gerekiyor.")
    if(!ayırıcı) return message.channel.send("Bu komudu kullanmak için **Ayırıcı** sunucuda ayarlı olması gerekiyor.")

    if(!message.member.roles.cache.has(db.fetch(`kayıty_${message.guild.id}`))) {
      return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
   }


  {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
      if(db.fetch(`kayıt_${message.guild.id}_${member.id}`, true)) return message.channel.send(`Bu Üye Daha Önceden Kayıt Olmuş Kayıt Edemem ${ayarlar.prefix}üyebilgi ile bilgi alabilirsiniz ardından tekrar kayıt edebilirsiniz.`)
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("**Kayıt Edebilmem İçin Bir ``İsim`` Girmelisin.**")
      if(!yas) return message.channel.send("**Kayıt Edebilmem İçin Bir ``Yaş`` Girmelisin.**")
    c.roles.add(nkızkayıt)
    c.roles.remove(narcosmisafir)
    c.setNickname(`${tag} ${nick} ${ayırıcı} ${yas}`)
    db.add(`kızkayıtstats_${message.author.id}.${message.guild.id}`, 1)
        const narcoscod = new Discord.MessageEmbed()
    .setDescription(`
:white_check_mark: Kayıt Başarılı :white_check_mark:

• Kaydı Yapılan Üye: **${c.user.tag}**
• Değiştirilen İsim: ${tag} ${nick} ${ayırıcı} ${yas}
• Verilen Rol: ${nkızkayıt}
`)
.addField(`Toplam Erkek Kayıt\n`, toplam || 0)
.addField(`Toplam Kız Kayıt\n`, toplam2 || 0)

         .setFooter('Narcos Kayıt Sistemi')


         const klog = new Discord.MessageEmbed()
         .setDescription(`
         Kayıt LOG Sistemi
         
         • Kaydı Yapılan Üye: **${c.user.tag}**
         • Değiştirilen İsim: ${tag} ${nick} ${ayırıcı} ${yas}
         • Verilen Rol: <@&${nkayıterkek}>
         • Kayıt Eden Yetkili <@${message.author.id}>
         
         `)


     message.channel.send(narcoscod)
     client.channels.cache.get(log).send(klog)
     db.set(`kayıt_${message.guild.id}_${member.id}`, true)
     db.set(`kayıtisim_${message.guild.id}_${member.id}`, nick)
     db.set(`kayıtyas_${message.guild.id}_${member.id}`, yas)
    
     const gün = new Date()
     db.set(`kayitgun_${message.guild.id}_${member.id}`, gün)
     db.set(`cinsiyet${message.guild.id}_${member.id}`, "Kız")
     db.set(`kayteden_${message.author.id}_${member.id}`, message.author.id)

    
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k","bayan","kadın"],
  permLevel: 0
};
exports.help = {
  name: "kız",
  description: "Kız üye kaydedersin",
  usage: "",
  kategori: "kayıt"
};
   
