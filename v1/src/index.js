const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let jokes = [
  {id: 1, joke: 'Why couldnt the bicycle stand up by itself?'},
  {id: 2, joke: 'Im reading a book in anti gravity, its impossible to put down'},
  {id: 3, joke: 'Did you hear about the guy who invented lifesavers?'},
  {id: 4, joke: 'I used to be a baker, but I couldnt make enough dough'}
];

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the jokes REST API.');
});

app.get('/jokes', (req, res) => {
  res.send(jokes);
});

app.get('/randomjokes', (req, res) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(joke);
});

app.post('/jokes', (req, res) => {
  const newId = jokes[jokes.length - 1].id + 1;

  const joke = req.body;

  jokes.push({ id: newId, joke: joke });

  res.send({ id: newId, joke: joke });
});

app.delete('/jokes/:id', (req, res) => {
  const jokeId = req.params.id;

  const jokeIndex = jokes.findIndex(joke =>  joke.id === jokeId);
  jokes.splice(jokeIndex, 1)

  res.send({ message: 'Joke deleted successfully' });
});


app.listen(port, () => console.log(`Jokes API listening on port ${port}`));
