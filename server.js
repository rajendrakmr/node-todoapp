const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const todo = req.body.todo;
  if (todo) {
    todos.push(todo);
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) {
    todos.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});