import Sequelize from 'sequelize'
import mongoose, { model } from 'mongoose'

import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

import configDatabase from '../config/database'


const models = [User, Product, Category]

class Database {
    constructor(){
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize('postgresql://postgres:RdSagjCQtCkIdPNEcVhlxhudOSUtyJTA@viaduct.proxy.rlwy.net:39621/railway')
        models.map((model) => model.init(this.connection))
        .map(
            (model) => model.associate && model.associate(this.connection.models)
        )

    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://mongo:TBQMtElwnHOLibFJkDHoLJAIgamMwGtr@roundhouse.proxy.rlwy.net:22324',
            {
                useNewUrlParser: true,
                useUniFiedTopology: true,
            }
        )
    }
}

export default new Database()