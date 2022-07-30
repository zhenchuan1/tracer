const { Sequelize } = require('sequelize')
const sequelize = require("../dao/baseDao")
const App = require('../config/AppConfig')
const { logger } = App

class BaseService {
    success(data) {
        return {
            code: App.errorCode.SUCCESS,
            mes: "",
            data: data
        }
    }

    fail(mes) {
        return {
            code: App.errorCode.FAIL,
            mes: mes,
            data: null
        }
    }

    async put(msg) {
        try {
            const tracer = App.tracer.find(v => v.id === msg.tracer_id)
            if (!tracer) {
                return
            }
            const tracerModel = {}
            for (const key of tracer.key) {
                tracerModel[key] = {
                    type: Sequelize.STRING,
                    defaultValue: '',
                    allowNull: true
                }
            }
            const tracerTable = sequelize.define(tracer.id, tracerModel, {
                freezeTableName: true,
                tableName: tracer.id
            })
            await tracerTable.sync({force: false})
            const tracerValue = {}
            for (const key of tracer.key) {
                tracerValue[key] = msg[key]
            }
            await tracerTable.create(tracerValue)
        } catch(e) {
            logger.warn(e)
        }
    }

    async get(param) {
        try {
            let {sql} = param
            if (!sql) {
                throw "not found sql"
            }
            logger.info(sql)
            sql = decodeURIComponent(sql)
            const data = await sequelize.query(sql)
            return this.success(data[0])
        } catch (e) {
            logger.error(e)
            return this.fail(e)
        }
    }
}

module.exports = BaseService