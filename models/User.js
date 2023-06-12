// Importing dependencies
const { Model, DataTypes } = require('sequelize'); // Importing the Model and DataTypes classes from Sequelize.
const bcrypt = require('bcrypt'); // Importing the bcrypt library for password hashing.

// Importing configuration
const sequelize = require('../config/config'); // Importing the Sequelize instance configured with database connection settings from a separate file.

// Defining the User model
class User extends Model {
  // Method to compare passwords
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializing the User model
User.init(
  // Column definitions
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  // Configuration options
  {
    hooks: {
      // Hook executed before creating a User instance
      beforeCreate: async function (newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hashing the password using bcrypt
        return newUserData;
      },
      // Hook executed before updating a User instance
      beforeUpdate: async function (updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // Hashing the password using bcrypt
        return updatedUserData;
      }
    },
    sequelize: sequelize, // Associating the User model with the Sequelize instance
    timestamps: false, // Disabling timestamps for the User model
    freezeTableName: true, // Freezing the table name
    underscored: true, // Using underscored naming convention
    modelName: 'User' // Setting the model name
  }
);

module.exports = User; // Exporting the User model for use in other parts of the application.