const tracerConfig = require('./tracerConfig.json')
const log4js = require('log4js')
log4js.configure({
    appenders: {
      everything: {
        type: "file",
        filename: "tracer.log",
        maxLogSize: 10485760,
        backups: 3,
        compress: true,
      },
    },
    categories: {
      default: { appenders: ["everything"], level: "WARN" },
    },
});
const logger = log4js.getLogger()

 
 /**
  * 其他配置
  * */
const App = {
    DB:{
        username:"root",
        password:"123456",
        database:"tracer",
        host:"localhost",
        port: 3307,
        dialect: 'mysql',
        define: {
            underscored: false,
            timestamps: true,
            paranoid: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: msg => logger.info(msg)
    },
    logger,
    tracer: tracerConfig.tracer,
    errorCode: {
        SUCCESS: 0,
        FAIL: 1,
    }
}

module.exports = App
 