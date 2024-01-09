import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";
import {Responses} from "./responses.model";
import {Invitation} from "./invitation.model";
import {Views} from "./views.model";

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

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    user_id: number;

    @HasMany(() => Responses)
    response: Responses[];

    @HasMany(() => Invitation)
    invitation: Invitation[];

    @HasMany(() => Views)
    views: Views[];
}