import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table({tableName: 'contacts', createdAt: false, updatedAt: false})
export class Contacts  extends Model<Contacts>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    phone: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    messenger_name: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    messenger_link: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    website: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    user_id: number;

    @BelongsTo(() => User)
    user: User
}