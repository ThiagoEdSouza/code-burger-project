import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order  from '../schemas/Order'
import User from '../models/User'


class OrderController{
  async store(request, response){

    const schema = Yup.object().shape({
      products: Yup.array() //Tipo array
      .required() //Obrigatório
      .of( //Indicando que queremos buscar os objetos do array
        Yup.object().shape({ //Indicamos o modelo do objeto
          id:Yup.number().required(), //Tipo number e obrigatório
          quantity:Yup.number().required(), //Tipo number e obrigatório
        })
      ),  
    })

    console.log(request)
    try {
      await schema.validateSync(request.body, { abortEarly: false}) //Operação abortEarly é para que o validador não pare no primeiro erro, mas indique todos.
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const productsId = request.body.products.map((product) => product.id) //Indicamos que queremos a informação do id dos produtos.

    
    const updatedProducts = await Product.findAll({ //Indicamos para buscar todos os campos da tabelas
      where: {
        id: productsId, //Onde os produtos correspondem ao id de produto enviado.
      },
      include: [ //Include como array para buscar as informações de Categorias
        {
          model: Category, //Acessamos o model de Categorias para buscar a categoria desejada.
          as: 'category', //Importamos como category
          attributes: ['name'], //Indicamos o atributo desejado
        },
      ],
    })

    const editedProduct = updatedProducts.map( product =>{ //Criamos uma nova variável que pega as informações da variável anterior
      const productIndex = request.body.products.findIndex( //Primeiro criamos o verificador de id dos produtos para atribuição da quantity.
        (requestProduct) => requestProduct.id === product.id //Definimos a condição de comparação dos id's.
      )

      const newProduct = { //Identificamos a variável que será responsável por trazer as informações que precisamos.
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: request.body.products[productIndex].quantity,
      }

      return newProduct
    })

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProduct,
      status: 'Pedido Realizado',
    }

    const orderResponse = await Order.create(order)

    return response.status(201).json(orderResponse)
  }

  async index(request, response){
    const orders = await Order.find()

    return response.json(orders)
  }

  async update(request, response){
    const schema = Yup.object().shape({
      status: Yup.string().required(),
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
    const { status } = request.body

    try {
      await Order.updateOne({ _id: id }, { status })
    
    }catch (error) {
      return response.status(400).json({ error: error.message})
    }

    return response.json({ message: 'Status Updated Successfully.' })
  }

}

export default new OrderController()