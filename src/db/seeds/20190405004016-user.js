'use strict';

const faker = require("faker");
const bcrypt = require("bcryptjs"); 

const myPlaintextPassword = "not_bacon";
const salt = bcrypt.genSaltSync(10);

let users = [];

for (let i = 1; i <= 15; i++) {
  users.push({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(myPlaintextPassword, salt),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard",
  });
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
      return queryInterface.bulkDelete("Users", null, {});
  }
};
