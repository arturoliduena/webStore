var sql = require('../db/sequelize').connect;
var S= require('../db/sequelize').Sequelize;
var Users = require('./users');
var Products = require('./products');


var Categorias = sql.define('categorias', {
		nombre: { type: S.STRING, allowNull: false, unique: true },
    description: { type: S.STRING, allowNull: false },
  });


Categorias.hasMany(Products, {foreignKey: 'id_categoria', onDelete: 'cascade'});

  

module.exports = Categorias;
