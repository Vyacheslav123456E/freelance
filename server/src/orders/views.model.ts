import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Orders} from "./orders.model";

@Table({tableName: 'views', createdAt: true, updatedAt: true})
export class Views extends Model<Views>{
    @Column({type: DataType.INTEGER, allowNull: false,autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    order_id: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    user_id: number;

    @BelongsTo(() => Orders)
    orders: Orders
}