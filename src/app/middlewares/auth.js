import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' })
    }

    const token = authToken.split(' ')[1]

    try {
        jwt.verify(token, authConfig.secret, function(err, decoded){ //Verificador atribui 2 parâmetros e uma função
            if(err){ //Caso de erro
                throw new Error() //Automaticamente manda para o catch
            }

            request.userId = decoded.id //Guarda o id decodificado
            request.userName = decoded.name //Guarda o name decodificado

            return next() 
        } )
    } catch(err){
      return response.status(401).json({ error: 'Token is invalid' })
    }

    
}
