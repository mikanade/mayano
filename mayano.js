// discord.js モジュールのインポート
const Discord = require('discord.js');
const config = require('../config.json');

// Discord Clientのインスタンス作成
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });



// トークンの用意
const token = config.BOT_TOKEN;

const prefix = "/mayano ";

// 起動するとconsoleにready...と表示される
client.on('ready', () => {
    console.log('ready...');
});

client.on('messageCreate', message => {
    if(message.author.bot) return; //BOTのメッセージには反応しない
    if (!message.content.startsWith(prefix)) return; // 送られたメッセージが/mayanoで始まっていなかったら

    if(message.content.startsWith(prefix)){ //送られたメッセージが /mayanoで始まっていたら
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        message.channel.send("ok "+command);
        //メッセージが送られたチャンネルに okと送信する
        if (command === "ping") {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        }
        else if (command === "sum") {
            const numArgs = args.map(x => parseFloat(x));
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.reply(`The sum of all the arguments you provided is ${sum}!`);
        }
	else if (command === "getlog") {
            // コマンドが送信されたチャンネルから直近100件(上限)メッセージを取得する
            const messages = message.channel.messages.fetch({ limit: 100 });
            message.channel.send("getlog"+ messages.size); 
	    //messages.forEach(msg =>
            //    message.channel.send(`${msg.author.username} | ${msg.content}`)
	    //) 
	}
    }


})

// Discordへの接続
client.login(token);
