import express from "express"; // Importando o express
import routes from "./routes"; // Importando o routes
import { resolve } from "path"; // Importando o resolve do path (url das imagens) 
import cors from 'cors' // Importando o cors

import './database'

class App {
  // Criando a classe App para ser utilizada no back-end da aplicação.
  constructor() {
    // Iniciando com o método constructor que será chamado toda vez que a classe for instanciada.
    this.app = express(); // This para tornar o express disnponível para exportação.

    this.app.use(cors()); //Chamando o cors
    
    this.middlewares(); // Chamando os middlewares.

    this.routes(); // Chamando as routes.
  }

  middlewares() {
    // Criado o método dos middlewares.
    this.app.use(express.json()); // Indicamos que o middleware utilizará json.
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )

    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )
  }

  routes() {
    // Criado o método das routes.
    this.app.use(routes); // Indicamos que todas as rotas estão disponíveis para a nossa aplicação.
  }
}

export default new App().app; // Exportando o App.
