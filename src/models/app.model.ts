import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/database.ts'

class App extends Model {
  public id!: number
  public name!: string
  public icon!: string
  public url!: string
}

App.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize, // Explicitly type sequelize instance
    modelName: 'App'
  }
)

export default App
