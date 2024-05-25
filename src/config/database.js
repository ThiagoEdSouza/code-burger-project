module.exports = {
    dialect: 'postgres', //Indicando qua o banco de dados utilizado
    url:'postgresql://postgres:vPEBpKnUIpTMjLTYoUQECQfEsVyfcPUl@monorail.proxy.rlwy.net:45592/railway',
    define: { //Criando algumas definições
        timestamps: true, //Auxilia na rastreabilidade dos nossos dados por criar as datas de criação e alteração dos dados
        underscored: true,
        undercoredAll: true, //Configurações para nomear as tabelas em caixa baixa e separadas pelo '_'
    }
}