var express = require('express');
let db = require('../utils/db.js')
var router = express.Router();

router.get('/listar', function(req, res) {
  let cmd = 'SELECT idAutor, NoAutor, NoNacionalidade';
  cmd += '    FROM tbautor AS a INNER JOIN tbnacionalidade AS n';
  cmd += '      ON a.idNacionalidade = n.idNacionalidade';
  cmd += ' ORDER BY Noautor'; 
  
  db.query(cmd, [], function(erro, listagem) { // Corrigido para usar a variável cmd
    if (erro) {
      res.send(erro);
    } else {
      res.render('autores-lista', { resultado: listagem }); // Corrigido para enviar um objeto
    }
  });
});


router.get('/add', function(req, res) {
  
      res.render('autores-add')
  });
module.exports = router;
