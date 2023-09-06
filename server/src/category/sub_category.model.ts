import {Column, DataType, ForeignKey, Model, Table, BelongsTo} from "sequelize-typescript";
import {Category} from "./category.model";

@Table({tableName: 'sub_category', createdAt: false, updatedAt: false})
export class Sub_category extends Model<Sub_category>{
    @Column({type: DataType.INTEGER, allowNull: false,autoIncrement: true,primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, allowNull: false})
    category_id: number;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: null})
    sub_id: string;

    @BelongsTo(() => Category)
    category: Category
}