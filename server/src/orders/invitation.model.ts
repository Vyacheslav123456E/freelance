import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Orders} from "./orders.model";

@Table({tableName: 'responses', createdAt: true, updatedAt: true})
export class Invitation extends Model<Invitation>{
    @Column({type: DataType.INTEGER, allowNull: false,autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    order_id: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    user_id: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    status: number;

    @BelongsTo(() => Orders)
    orders: Orders
}