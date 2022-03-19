const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

//rota de teste
router.get('/test', (req, res) => {
  res.send('deu certo');
});

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router