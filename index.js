
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();
  const msg = req.body.Body.toLowerCase();

  if (msg === 'hi' || msg === 'hello') {
    twiml.message('Hey 👋! Welcome to my WhatsApp bot 🚀');
  } else if (msg === 'menu') {
    twiml.message('Options:\n1) Help\n2) Info\n3) Time\n4) Joke\n5) Calculator\n6) Weather\n7) Exit');
  }
  else if (msg === '1' || msg === 'help') {
    twiml.message('Available commands:\n• hi/hello - Greeting\n• menu - Show options\n• time - Current time\n• joke - Random joke\n• calc [expression] - Calculator\n• weather - Weather info');
  } else if (msg === '2' || msg === 'info') {
    twiml.message('🤖 WhatsApp Bot v2.0\nCreated with Node.js & Twilio\nType "menu" for options');
  } else if (msg === '3' || msg === 'time') {
    twiml.message(`🕐 Current time: ${new Date().toLocaleString()}`);
  } else if (msg === '4' || msg === 'joke') {
    const jokes = [
      'Why don\'t scientists trust atoms? Because they make up everything! 😄',
      'Why did the scarecrow win an award? He was outstanding in his field! 🌾',
      'Why don\'t eggs tell jokes? They\'d crack each other up! 🥚'
    ];
    twiml.message(jokes[Math.floor(Math.random() * jokes.length)]);
  } else if (msg.startsWith('calc ') || msg.startsWith('5 ')) {
    const expression = msg.replace(/^(calc |5 )/, '');
    try {
      const result = eval(expression.replace(/[^0-9+\-*/().\s]/g, ''));
      twiml.message(`🧮 Result: ${expression} = ${result}`);
    } catch {
      twiml.message('❌ Invalid calculation. Use format: calc 2+2');
    }
  } else if (msg === '6' || msg === 'weather') {
    twiml.message('🌤️ Weather: 22°C, Partly cloudy\n(Connect to weather API for real data)');
  } else if (msg === '7' || msg === 'exit' || msg === 'bye') {
    twiml.message('👋 Goodbye! Thanks for using the bot!');
  }

  else {
    twiml.message("Sorry, I didn’t understand. Try 'hi' or 'menu'.");
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
