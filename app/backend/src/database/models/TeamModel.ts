import { Model, DataTypes } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'TeamModel',
  underscored: true, // torna o que está em camelCase em snekeize
  timestamps: false,
});

export default TeamModel;
