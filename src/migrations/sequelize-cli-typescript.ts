import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize()

const queryInterface = sequelize.getQueryInterface()

module.exports = {
  up: async () => {
    await queryInterface.createTable('TestTable', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },

  down: async () => {
    await queryInterface.dropTable('TestTable')
  }
}
