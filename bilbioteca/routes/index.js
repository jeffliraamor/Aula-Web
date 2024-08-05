var express = require('express');
let db = require('../utils/db.js')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pedro' });
});

router.get('/sobre', function(req, res) {
  res.send ("<h2>Sobre rotas...</h2>");
});

router.get('/ola/:nome', function(req, res) {
  res.send ("<h2>Ola "+ req.params.nome +" tudo bem?</h2>");
});

router.get('/imc', function(req, res) {
  let peso = req.query.peso
  let estatura = req.query.estatura

  let imc = peso / Math.pow(estatura, 2)
  let msg = "<h3>Seu IMC é: "+ imc.toFixed(2) +"</h3>"
  res.send(msg)
});

let autores = ["Miriam Leitão", "Ana beatriz Silva Barbosa", "Stephan King"];
router.use(express.urlencoded({extended:true}));

router.get('/autores', function(req, res) {
  res.json(autores);
});


router.get('/autores/consulta/:id', function(req, res) {
  let id = req.params.id;
  res.json(autores[id]);
});


router.post('/autores/inclui', function(req, res) {
  let nome = req.body.nome;
  autores.push(nome);
  console.log(autores);
  res.json(autores);
});

router.put('/autores/altera/:id', function(req, res) {
  let id = req.params.id;
  let nome = req.body.nome;
  autores[id] = nome;
  res.json(autores);
});

router.delete('/autores/exclui/:id', function(req, res) {
  let id = req.params.id;
  
  autores.splice(id, 1);
  res.json(autores);
});

router.get('/autores/listar', function(req, res) {
  let cmd = 'SELECT idautor, Noautor, Nointernacionalidade';
  cmd += '    FROM tbautor AS a INNER JOIN tbNacionalidade AS n';
  cmd += '      ON a.Idnacionalidade = n.Idnacionalidade';
  cmd += ' ORDER BY Noautor'; // Corrigido para ORDER BY
  
  db.query(cmd, [], function(erro, listagem) { // Corrigido para usar a variável cmd
    if (erro) {
      res.send(erro);
    } else {
      res.render('autores-lista', { resultado: listagem }); // Corrigido para enviar um objeto
    }
  });
});

module.exports = router;
