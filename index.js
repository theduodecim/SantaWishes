const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs'); // Setting the view engine
app.use(express.static(__dirname + '/public')); // this allow to express to look on the public folder for the images

app.use(bodyParser.urlencoded({
  extended: false
}));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo', //This is our mongo container that is why is not localhost
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//once we connect we brings the models
const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', {
      items
    }))
    .catch(err => res.status(404).json({
      msg: 'No items found'
    }));
});

app.post('/item/add', (req, res) => {

  const newItem = new Item({
    name: req.body.name,
    description: req.body.description
  });
  newItem.save()
    .then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));