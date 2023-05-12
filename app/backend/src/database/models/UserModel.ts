import { Model, DataTypes } from 'sequelize';
import db from '.';

export interface UserAtributes{
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type UserCreationAtributes = Omit<UserAtributes, 'id'>;

class UserModel extends Model<UserAtributes, UserCreationAtributes> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}
UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true, // torna o que está em camelCase em snekeize
  timestamps: false,
});

export default UserModel;
