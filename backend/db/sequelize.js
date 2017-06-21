var Sequelize = require("sequelize"); //requerimos el modulo
var connect = new Sequelize('postgres://postgres:arthu.r2@localhost:5432/webstore');

module.exports = { connect, Sequelize};
