const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('.')); // serwuje index.html i inne pliki statyczne

// Twoja strona główna (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpointy do executora
app.post('/send', (req, res) => {
  const { username, code } = req.body;
  if (!username || !code) {
    return res.status(400).send('Invalid username or code');
  }
  // Tutaj możesz dodać logikę kolejki jeśli chcesz
  console.log(`[SEND] ${username} → code received`);
  res.status(200).send('Code received');
});

app.get('/fetch/:username', (req, res) => {
  // Na razie pusty – dodaj logikę kolejki jeśli potrzebujesz
  res.status(204).send();
});

app.post('/report', (req, res) => {
  const { username, gameName } = req.body;
  console.log(`[REPORT] ${username} is playing ${gameName}`);
  res.status(200).send('Game name received');
});

app.listen(PORT, () => {
  console.log(`ISA Webserver running on port ${PORT}`);
});
