import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table({tableName: 'birthday_user', createdAt: false, updatedAt: false})
export class Birthday extends Model<Birthday>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    day: number;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    month: string;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    year: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    user_id: number;

    @BelongsTo(() => User)
    user: User
}