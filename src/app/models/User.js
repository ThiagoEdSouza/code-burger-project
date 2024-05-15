import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'


class User extends Model {
    static init(sequelize){
        super.init(
          {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
          },
          {
            sequelize,
          }
        )

        this.addHook('beforeSave', async (user) => { //addHook habilita a possibilidade de executar a função antes ou depois de salvar os dados.
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 10)
          }
        })

        return this
    }

    checkPassword(password) {
      return bcrypt.compare(password, this.password_hash)
    }
}

export default User