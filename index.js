if (!process.env.PAGE_ACCESS_TOKEN) {
    console.log('Error: Specify page_token in environment');
    process.exit(1);
}

if (!process.env.VERIFY_TOKEN) {
    console.log('Error: Specify verify_token in environment');
    process.exit(1);
}

var Botkit = require('botkit');

var controller = Botkit.facebookbot({
    access_token: process.env.PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN
});

var bot = controller.spawn({});

controller.setupWebserver(process.env.PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');
    });
});

controller.hears(['hello', 'hi'], 'message_received', function(bot, message) {
  bot.reply(message, 'Hi there');
});

controller.hears(['really?'], 'message_received', function(bot, message) {
  bot.reply(message, 'Absolutely!!!!');
});

controller.hears(['fabulous'], 'message_received', function(bot, message) {
  var attachment = {
        'type':'template',
        'payload':{
            'template_type':'generic',
            'elements':[
                {
                    'title':'Fabulous metrics',
                    'image_url':'http://yourock.proworks.com/media/362/sticker_large_fabulous.png',
                    'subtitle':'Are you fabulous?',
                    'buttons':[
                        {
                        'type':'postback',
                        'title':'I`m very fabulous',
                        'payload':'yes'
                      },
                      {
                      'type':'postback',
                      'title':'No, i`m not',
                      'payload':'no'
                      }
                    ]
                },
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
    });
});

controller.on('facebook_postback', function(bot, message) {
    if (message.payload == 'yes') {
        bot.reply(message, 'I totally agree!!!')
    } else if (message.payload == 'no') {
      bot.reply(message, 'Oh, you are!')
    }
});
