import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Orders} from "./orders.model";
import {User} from "../users/user.model";

@Table({tableName: 'responses', createdAt: true, updatedAt: true})
export class Responses extends Model<Responses>{
    @Column({type: DataType.INTEGER, allowNull: false,autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    order_id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    user_id: number;

    @Column({type: DataType.TEXT, allowNull: true, defaultValue: null})
    text: string;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    status: number;

    @BelongsTo(() => Orders)
    orders: Orders

    @BelongsTo(() => User)
    user: User
}