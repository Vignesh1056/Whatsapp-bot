
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
    twiml.message('Options:\n1) Help\n2) Info\n3) Exit');
  } else {
    twiml.message("Sorry, I didn’t understand. Try 'hi' or 'menu'.");
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
