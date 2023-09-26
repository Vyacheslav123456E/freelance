import {Table, Model, DataType, Column} from "sequelize-typescript";

@Table({tableName: 'users', createdAt: false, updatedAt: false})
export class User extends Model<User>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    avatar: string;
    @Column({type: DataType.BOOLEAN, allowNull: true, defaultValue: false})
    blocking: boolean;
    @Column({type: DataType.STRING, unique: true, allowNull: true, defaultValue: null})
    email: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    name: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    password: string;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    phone: string;
    @Column({type: DataType.INTEGER, allowNull: true,defaultValue: 0})
    role_id: number;
    @Column({type: DataType.BOOLEAN, allowNull: false,defaultValue: false})
    status: boolean;
    @Column({type: DataType.STRING, allowNull: true,defaultValue: null})
    ip_address: string;
    @Column({type: DataType.INTEGER, allowNull: true,defaultValue: 0})
    vk_id: number;
}