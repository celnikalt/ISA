const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('.'));                    // serwuje index.html i inne pliki

// Główna strona
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpointy executora
app.post('/send', (req, res) => {
  const { username, code } = req.body;
  if (!username || !code) {
    return res.status(400).send('Invalid username or code');
  }
  console.log(`[SEND] ${username} → code received`);
  res.status(200).send('Code received');
});

app.get('/fetch/:username', (req, res) => {
  // na razie pusty (dodaj później logikę kolejki jeśli chcesz)
  res.status(204).send();
});

app.post('/report', (req, res) => {
  const { username, gameName } = req.body;
  console.log(`[REPORT] ${username} is playing ${gameName}`);
  res.status(200).send('Game name received');
});

app.listen(PORT, () => {
  console.log(`✅ ISA Webserver running on port ${PORT}`);
});
