'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      // Users not user - this is consistent with bloccit
    return queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "standard" // switching from 0 to "standard" 
    });
  },

  down: (queryInterface, Sequelize) => {
      // Users not user - this is consistent with bloccit
    return queryInterface.removeColumn("Users", "role");
  }
};

