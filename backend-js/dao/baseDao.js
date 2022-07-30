const Sequelize = require('sequelize')
const App = require("../config/AppConfig")
const config = App.DB
const sequelize = new Sequelize(config.database,config.username,config.password,config)
module.exports = sequelize