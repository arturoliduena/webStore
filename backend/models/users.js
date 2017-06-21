var sql = require('../db/sequelize').connect;
var S= require('../db/sequelize').Sequelize;
var Categorias = require('./categorias');
var Products = require('./products');

var Users = sql.define('user',{
  nombre: { type: S.STRING, allowNull: false, unique: true },
  mail: { type: S.STRING, allowNull: false },
  password: { type: S.STRING, allowNull: false },
});

Users.hasMany(Products, {foreignKey: 'id_Users', onDelete: 'cascade'});

sql.sync({force: false}).then(() => {
  Users.create({
    nombre: 'Arturo',
    mail: 'arturo@gmail.com',
    password: '123456',
  }).then(function(user) {
  });
  Categorias.create({
    nombre: 'Cortas',
    description: 'Pistolas y revolveres',
  }).then(function(user) {
  });

  Categorias.create({
    nombre: 'Largas',
    description: 'Rifles y fusiles',
  }).then(function(user) {
  })
})
console.log('users');

module.exports = Users;
