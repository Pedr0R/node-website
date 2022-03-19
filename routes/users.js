const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const User = require('../models/User')

//rota de teste
router.get('/test', (req, res) => {
  res.send('deu certo');
});

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

// register user
router.post('/register', (req, res) =>{

  let {username, password, email, confirmed} = req.body;

  User.create({
    username,
    password,
    email,
    confirmed
  })
  .then(() => res.redirect('/login'))
  .catch(err => console.log(err));
})

module.exports = router