import { Model, DataTypes } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

export interface MatchAtributes{
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchCreationAtributes = Omit<MatchAtributes, 'id'>;

export default class MatchModel extends Model<MatchAtributes, MatchCreationAtributes> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true, // torna o que está em camelCase em snekeize
  timestamps: false,
});

// estabelecendo associações (relacionamentos) entre o MatchModel e o TeamModel:
TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });
// Uma partida pertence tanto ao time da casa quanto ao time visitante,
// portanto, defini os relacionamentos de chave estrangeira usando os métodos belongsTo e hasMany fornecidos pelo Sequelize.
