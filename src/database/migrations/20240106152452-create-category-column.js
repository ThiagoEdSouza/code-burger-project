'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn( 'Categories', 'path', { 
        type: Sequelize.STRING, //Tipo string
     });
    },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('Categories', 'path');
  },
}
