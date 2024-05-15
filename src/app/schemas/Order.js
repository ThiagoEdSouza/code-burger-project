import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({

    user:{ // Primeiro indicamos de quem vem o nosso pedido, no caso do usuário
        id:{ //Indicamos que queremos o id do usuário
            type:String,
            required: true
        },
        name:{ //Indicamos que queremos o name do usuário
            type:String,
            required: true
        },
    },
    products:[ // Indicamos os produtos que serão pedidos pelo usuário, como podem ser muitos atribuímos em forma de array
        {
            id:{ //Indicamos que queremos o id do produto
                type:Number,
                required: true
            },
            name:{ //Indicamos que queremos o name do produto
                type:String,
                required: true
            },
            price:{ //Indicamos que queremos o price do produto
                type:Number,
                required: true
            },
            category:{ //Indicamos que queremos a category do produto
                type:String,
                required: true
            },
            url:{ //Indicamos que queremos a url do produto
                type:String,
                required: true
            },
            quantity:{ //Indicamos que queremos a quantity do produto
                type:Number,
                required: true
            },
        },
    ],
    status: { // Indicamos o status do pedido efetuado pelo usuário,
        type:String,
        required:true,
    },
},
{
    timestamps:true, // O banco criar os registros de createe update dos dados.
}
)

export default mongoose.model('Order', OrderSchema) // Forma correta de exportar no MongoDB