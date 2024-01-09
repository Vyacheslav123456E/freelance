import {Table, Model, DataType, Column, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import {Birthday} from "./birthday.model";
import {Specialization} from "./specialization.model"
import {Contacts} from "./contacts.model";
import {Orders} from "../orders/orders.model";
import {Roles} from "./roles.model";
import {Responses} from "../orders/responses.model";

@Table({tableName: 'users', createdAt: true, updatedAt: true})
export class User extends Model<User>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    avatar: string;
    @Column({type: DataType.BOOLEAN, allowNull: true, defaultValue: false})
    blocking: boolean;
    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    email: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    name: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    password: string;

    @ForeignKey(() => Roles)
    @Column({type: DataType.INTEGER, allowNull: true,defaultValue: 0})
    role_id: number;

    @Column({type: DataType.BOOLEAN, allowNull: false,defaultValue: false})
    status: boolean;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    ip_address: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    location: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    description: string;
    @Column({type: DataType.INTEGER, allowNull: true,defaultValue: 0})
    vk_id: number;

    @BelongsTo(() => Roles)
    roles: Roles

    @HasMany(() => Birthday)
    birthday: Birthday[];

    @HasMany(() => Specialization)
    specialization: Specialization[];

    @HasMany(() => Contacts)
    contacts: Contacts[];

    @HasMany(() => Orders)
    orders: Orders[];

    @HasMany(() => Responses)
    responses: Responses[];

}