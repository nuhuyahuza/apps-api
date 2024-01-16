import { type QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('TestTable', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      // Add your table columns here...
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

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('TestTable')
  }
}
