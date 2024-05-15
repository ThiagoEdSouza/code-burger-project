'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('Products', 'category_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Categories', key: 'id'}, //indicamos a tabela e a chave a serem referenciadas com a coluna
      onUpdate: 'CASCADE', //Indicamos que em caso de atualização a atualização será feita em cascata
      onDelete: 'SET NULL', //Indicamos que em caso de delete o campo será setado como nulo
      allowNull: true, //Permitimos que o campo seja nulo.
  })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'category_id')
  },
}
