import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Sub_category} from "./sub_category.model";

@Table({tableName: 'category', createdAt: false, updatedAt: false})
export class Category extends Model<Category>{
    @Column({type: DataType.INTEGER, allowNull: false,autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    key: string;

    @HasMany(() => Sub_category)
    children: Sub_category[];
}