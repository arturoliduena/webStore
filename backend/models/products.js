var sql = require('../db/sequelize').connect;
var S= require('../db/sequelize').Sequelize;
var Users = require('./users');



var Products = sql.define('products',{
   nombre: { type: S.STRING, allowNull: false },
   imgUrl: { type: S.STRING, allowNull: false },
   description: { type: S.STRING, allowNull: false },
   precio: { type: S.INTEGER, defaultValue: 0, allowNull: false},
});



module.exports = Products;
