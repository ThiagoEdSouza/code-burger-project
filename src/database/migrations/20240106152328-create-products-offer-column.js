'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'offer', { //Add coluna de ofertas
      type: Sequelize.BOOLEAN, //Tipo booleano (verdadeiro ou falso)
      defaultValue: false, //Valor padrão falso para os produtos, só alteramos os quê realmente estão em oferta
      allowNull: false, //Não permite campo nulo
     });
    },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('Products', 'offer');
  },
}
