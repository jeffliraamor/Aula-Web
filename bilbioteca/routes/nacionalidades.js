var express = require('express');
let db = require('../utils/db.js')
var router = express.Router();

router.get('/listar', function(req, res) {
  let cmd = 'SELECT idnacionalidade, NoNacionalidade FROM tbnacionalidade ORDER BY Nonacionalidade;'; 
  db.query(cmd, [], function(erro, listagem) { 
    if (erro) {
      res.send(erro);
    } else {
      res.json({ resultado: listagem }); 
    }
  });
});

module.exports = router;
