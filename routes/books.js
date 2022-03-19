const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Book = require('../models/Book');

//rota de teste
router.get('/test', (req, res) => {
  res.send('deu certo');
});

//ver mais do livro
router.get('/view/:id', (req, res) => Book.findOne({
  where: {id: req.params.id}
  }).then(book => {
    
    res.render('view', {
      book
    });

}).catch(err => console.log(err)));

// form da rota de envio
router.get('/add', (req, res) => {
  res.render('add');
})

// add book via post
router.post('/add', (req, res) =>{

  let {title, author, user, description, is_new} = req.body;
  //insert

  Book.create({
    title,
    author,
    user,
    description,
    is_new
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
})

module.exports = router