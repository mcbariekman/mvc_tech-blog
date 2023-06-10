// Importing necessary modules
const { Model, DataTypes } = require('sequelize'); // Importing required objects from Sequelize library
const bcrypt = require('bcrypt'); // Importing bcrypt module for password hashing
const sequelize = require('../config/connection'); // Importing Sequelize instance

// Defining User model
class User extends Model {
  // Method to check if provided password matches the stored password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializing User model
User.init(
  {
    // Defining attributes of User model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Defining options for User model
    hooks: {
      // Hook executed before creating a new user to hash the password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize, // Specifying the Sequelize instance to use
    timestamps: false, // Disabling createdAt and updatedAt columns
    freezeTableName: true, // Ensuring the table name matches the model name
    underscored: true, // Converting model names to snake case for table names
    modelName: 'user', // Setting the model name to 'user'
  }
);

module.exports = User; // Exporting the User model
