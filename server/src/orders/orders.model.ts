import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'orders', createdAt: true, updatedAt: true})
export class Orders extends Model<Orders>{
    @Column({type: DataType.INTEGER, allowNull: false,autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    title: string;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    categories: string;

    @Column({type: DataType.TEXT, allowNull: true, defaultValue: null})
    description: string;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    tags: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    price: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    type_price: string;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    files: string;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    views: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    responses: number;
}