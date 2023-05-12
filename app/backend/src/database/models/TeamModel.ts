import { Model, DataTypes } from 'sequelize';
import db from '.';

export interface TeamAtributes{
  id: number;
  teamName: string;
}

export type TeamCreationAtributes = Omit<TeamAtributes, 'id'>;

class TeamModel extends Model<TeamAtributes, TeamCreationAtributes> {
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
  modelName: 'teams', // nome da tabela
  underscored: true, // torna o que está em camelCase em snekeize
  timestamps: false,
});

export default TeamModel;
