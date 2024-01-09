import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table({tableName: 'specializations', createdAt: false, updatedAt: false})
export class Specialization extends Model<Specialization>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    activity: string;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    experience: number;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    form_ownership: string;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
    payment: number;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    payment_method: string;

    @Column({type: DataType.JSONB, allowNull: true, defaultValue: null})
    skills: string;
    
    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    specialization: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    type_price: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    user_id: number;

    @BelongsTo(() => User)
    user: User
}