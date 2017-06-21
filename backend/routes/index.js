var express = require('express');
var router = express.Router();

var sequelize = require('../db/sequelize');
var Users = require('../models/users');
var Sequelize = require("sequelize");
var Products = require('../models/products')
var Categorias = require('../models/categorias')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', function (req, res) {
    Users.findAll().then(function (users) {
      console.log(users.nombre);
      res.send(users)
    })
})

router.post('/newProduct', function (req, res) {
  console.log('entra');
  console.log(req.body.precio);
  console.log(req.body.id_categoria)
  Products.create({
  nombre: req.body.nombre,
  imgUrl: req.body.imgUrl,
  description: req.body.description,
  precio: req.body.precio,
  id_categoria: req.body.id_categoria,
  }).then(function (product) {
    res.send(product)
  })
})

router.post('/newCategoria', function (req, res) {
  console.log(req.body);

  Categorias.create({
  nombre: req.body.nombre,
  description: req.body.description,
  }).then(function (categoria) {
    res.send(categoria)
  })
})


router.get('/products', function (req, res) {
    Products.findAll().then(function (product) {
      console.log(product.nombre);
      res.send(product)
    })
})

router.get('/categorias', function (req, res) {
    Categorias.findAll().then(function (categorias) {
      console.log(categorias);
      res.send(categorias)
    })
})

router.post('/eliminarProduct', function (req, res) {
  console.log(req.body)
Products.findById(req.body.id).then(function(product){
             Products.destroy(
               {where: { id: product.id }
             })
           })
  res.send(req.body)
})


module.exports = router;
