// discord.js モジュールのインポート
const Discord = require('discord.js');
const config = require('./config.json');

// Discord Clientのインスタンス作成
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });



// トークンの用意
const token = config.BOT_TOKEN;

const prefix = "/";

// 起動するとconsoleにready...と表示される
client.on('ready', () => {
    console.log('ready...');
});

client.on('messageCreate', message => {
    if(message.author.bot) return; //BOTのメッセージには反応しない

    if(message.content === "/hello"){ //送られたメッセージが /helloだったら
        message.channel.send("HELLO!") 
        //メッセージが送られたチャンネルに HELLO!と送信する
    }
})

// Discordへの接続
client.login(token);
