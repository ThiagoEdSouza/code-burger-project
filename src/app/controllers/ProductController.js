import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'

class ProductController{
  async store(request, response){

    const schema = Yup.object().shape({
      name: Yup.string().required(),  //Tipo string e obrigatório
      price: Yup.number().required(), //Tipo number e obrigatório
      category_id: Yup.number().required(), //Tipo number e obrigatório.
      offer: Yup.boolean(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false}) //Operação abortEarly é para que o validador não pare no primeiro erro, mas indique todos.
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if(!isAdmin){
      return response.status(401).json({ error: 'User not authorized to perform the operation' })
    }

    const { filename: path } = request.file
    const { name, price, category_id, offer } = request.body

    const product = await Product.create({
      name,
      price: price, 
      category_id,
      path,
      offer,
    })

    return response.json(product)
  } 
  
  async index(request, response){
    const products = await Product.findAll({
      include: [
        {
          model:Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })

    return response.json(products)
  }

  async update(request, response){

    const schema = Yup.object().shape({
      name: Yup.string(), //Tipo string e não obrigatório
      price: Yup.number(), //Tipo number e não obrigatório
      category_id: Yup.number(), //Tipo number e não obrigatório.
      offer: Yup.boolean(), //Tipo booleano.
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false}) //Operação abortEarly é para que o validador não pare no primeiro erro, mas indique todos.
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if(!isAdmin){
      return response.status(401).json({ error: 'User not authorized to perform the operation' })
    }

    const { id } = request.params

    const product = await Product.findByPk(id) 

    if(!product) {
      return response
      .status(401)
      .json({ error: 'Product ID not found. Make sure your product Id is correct.' })
    }

    let path
    if (request.file){
      path = request.file.filename
    }

    const { name, price, category_id, offer } = request.body

    await Product.update(
      {
        name,
        price, 
        category_id,
        path,
        offer,
    },
    { where: { id }}
    )

    return response.status(200).json()
  }catch (err) {
   console.log(err)
  }
}


export default new ProductController()