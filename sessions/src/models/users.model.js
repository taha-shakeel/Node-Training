const dbContext = require("../common/dbContext");
const Sequelize = require("Sequelize");

const users = dbContext.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id" // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    name: {
      type: Sequelize.STRING,
      field: "name" // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    dob: {
      type: Sequelize.DATE,
      field: "dob"
    },
    age: {
      type: Sequelize.INTEGER,
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = users;