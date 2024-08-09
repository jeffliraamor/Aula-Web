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

  router.post('/add', function(req, res) {
    let nome          = req.body.nome;
    let nacionalidade = req.body.nacionalidade;
    let cmd = 'INSERT INTO tbautor (NoAutor, IdNacionalidade) VALUES (?, ?);';    
    db.query(cmd, [nome, nacionalidade], function(erro, listagem) { 
      if (erro) {
        res.send(erro);
      } 
      res.redirect('/autores/listar');     
    });
  });
  
router.get('/edit/:id', function(req, res) {
  let id = req.params.id;
  let cmd = 'SELECT IdAutor, NoAutor, IdNacionalidade FROM tbautor WHERE IdAutor = ?;';
  db.query(cmd, [id], function(erro, listagem) { 
    if (erro) {
      res.send(erro);
    }
    res.render('autores-add', { resultado: listagem[0] });
  });
});

module.exports = router;