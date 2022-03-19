const express    = require('express');
const exphbs     = require('express-handlebars');
const path       = require('path')
const { listen } = require('express/lib/application');
const app        = express();
const db         = require('./db/connection.js');
const bodyParser = require('body-parser');
const Book       = require('./models/Book');
const Sequelize  = require('sequelize')
const Op         = Sequelize.Op


const PORT = 3300;

app.listen(PORT, function() {
  console.log(`O express está rodando na porta ${PORT}`)
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

// handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')))

//db connection
db
  .authenticate()
  .then(() => {
    console.log('Succesfull Connected to the database');
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar', err)
  });

//routes
app.get('/', (req, res) => {

  let search = req.query.book;
  let query = '%'+search+'%';

  if(!search) {
    Book.findAll({order:[
      ['createdAt', 'DESC']
    ]})
    .then(books => {
  
      res.render('index', {
        books
      });
  
    })
    .catch(err => console.log(err))
  }else {
    Book.findAll({
      where: {title: {[Op.like]: query}},
      
      order:[
      ['createdAt', 'DESC']
    ]})
    .then(books => {
  
      res.render('index', {
        books
      });
  
    })
    .catch(err => console.log(err))
  }
});

//books routes
app.use('/books', require('./routes/books'));

//log in/register routes
app.use('/user', require('./routes/user'))
