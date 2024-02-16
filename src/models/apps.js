'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class apps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    static associate (models) {
      // define association here
    }
  }
  apps.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'apps'
  })
  return apps
}
