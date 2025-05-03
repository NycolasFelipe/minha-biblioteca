import { Table, Column, Model, DataType, AfterCreate } from 'sequelize-typescript';

// Password hashing
import hashPassword from 'src/util/hashPassword';

@Table({
  tableName: 'cliente',
  createdAt: false,
  updatedAt: false
})
export class Cliente extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set(value: string) {
      this.setDataValue('senha', hashPassword(value));
    }
  })
  senha!: string;

  @Column({
    type: DataType.STRING(14),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  })
  cpf_cnpj!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  nome!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true
    }
  })
  url_foto!: string | null;

  @AfterCreate
  static removeSenhaAfterCreate(instance: Cliente) {
    delete instance.dataValues.senha;
  }
}

export default Cliente;