import app from './app' //Sintaxe mais atual, porém ainda não aceita pelo node.

const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0') //Indicando a porta a ser utilizada no back-end.