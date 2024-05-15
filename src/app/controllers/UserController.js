import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from '../models/User'

class UserController{
  async store(request, response){

    const schema = Yup.object().shape({
      name: Yup.string().required(),  //Tipo string e obrigatório
      email: Yup.string().email().required(), //Tipo string, do tipo email(@dominio.algumacoisa) e obrigatório
      password: Yup.string().required().min(8), //Tipo string, obrigatório e mínimo de 8 caractéres.
      admin: Yup.boolean(), //Tipo booleano e não obrigatório
    })

    //if(!(await schema.isValid(request.body))) {
    //  return response
    //   .status(400)
    //   .json({error: 'Por favor. Certifique-se de que seus dados estão corretos.'})
    //}

    try {
      await schema.validateSync(request.body, { abortEarly: false}) //Operação abortEarly é para que o validador não pare no primeiro erro, mas indique todos.
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body 

    const userExists = await User.findOne({ //Criada const para verificação e indicamos a verificação de um dado semelhante
      where: { email }, //Indicamos que a verificação será na coluna email.
    })

    if (userExists) {
      return response.status(409).json({ error: 'User already exists.'}) //Se a verificação retornar como true, inica ao usuário que o email já está cadastrado.
    }

    console.log(userExists)

    const user = await User.create({
        id : v4(),
        name,
        email,
        password,
        admin,
    })

    return response.status(201).json({id: user.id, name, email, admin})
  }

}

export default new UserController()