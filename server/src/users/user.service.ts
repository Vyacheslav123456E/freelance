import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Utils} from "../utils";
import * as CryptoJS from 'crypto-js'
import {CreateUserDto} from "./dto/create-user.dto";
import {Birthday} from "./birthday.model";
import {response} from "express";
import {Specialization} from "./specialization.model";
import {CreateSpecializationDto} from "./dto/create-specialization.dto";
import {Contacts} from "./contacts.model";
import {CreateContactsDto} from "./dto/create-contacts";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User,
                @InjectModel(Birthday) private birthdayModel: typeof Birthday,
                @InjectModel(Specialization) private specializationModel: typeof Specialization,
                @InjectModel(Contacts) private contactsModel: typeof Contacts,
                private utilsService: Utils) {
    }

    async userInfo(payload: string) {
        const res = await this.userModel.findAll({where: {email: payload}});
        return JSON.stringify(res, null, 2);
    }

    async registration(userDto: CreateUserDto): Promise<boolean | any> {
        const findEmail = await this.findByEmailReg(userDto);
        if (findEmail) {
            return JSON.stringify({success: 0, message: 'Указанный email уже существует'});
        }
        let hashPassword = await this.utilsService.encrypt(JSON.stringify(userDto.password))
        Object.assign(userDto, {password: hashPassword});
        await this.userModel.create(userDto);

        const resFindEmail = await this.findByEmailReg(userDto);
        if (resFindEmail) {
            return JSON.stringify({
                success: 1,
                data: await this.utilsService.encrypt(JSON.stringify(resFindEmail))
            });
        }else {
            return this.utilsService.throw(0, 'Ошибка!');
        }
    }
    async findByEmailReg(userDto: CreateUserDto): Promise<User | null> {
        return await this.userModel.findOne({
            where: {email: userDto.email, role_id: Number(userDto.role_id)},
            include: [{
                model: Birthday, required: true,
                attributes: ['day', 'month', 'year']
            },{
                model: Specialization, required: true,
                attributes: ['activity', 'experience', 'form_ownership','payment', 'payment_method',
                    'skills','specialization','type_price']
            },{
                model: Contacts, required: true,
                attributes: ['phone', 'messenger_name', 'messenger_link', 'website']
            }],
            attributes: ['id', 'role_id', 'avatar', 'blocking', 'email', 'name', 'status', 'ip_address', 'location', 'password', 'description']
        });
    }

    async findByEmailLogin(userDto: CreateUserDto): Promise<User | null> {
        return await this.userModel.findOne({
            where: {email: userDto.email},
            include: [{
                model: Birthday, required: true,
                attributes: ['day', 'month', 'year']
            },{
                model: Specialization, required: true,
                attributes: ['activity', 'experience', 'form_ownership','payment', 'payment_method',
                    'skills','specialization','type_price']
            },{
                model: Contacts, required: true,
                attributes: ['phone', 'messenger_name', 'messenger_link', 'website']
            }],
            attributes: ['id', 'role_id', 'avatar', 'blocking', 'email', 'name', 'status', 'ip_address', 'location', 'password', 'description']
        });
    }
    async findById(userId: number): Promise<User | null> {
        return await this.userModel.findOne({
            where: {id: userId},
            include: [{
                model: Birthday, required: true,
                attributes: ['day', 'month', 'year']
            },{
                model: Specialization, required: true,
                attributes: ['activity', 'experience', 'form_ownership','payment', 'payment_method',
                             'skills','specialization','type_price']
            },{
                model: Contacts, required: true,
                attributes: ['phone', 'messenger_name', 'messenger_link', 'website']
            }],
            attributes: ['id', 'role_id', 'avatar', 'blocking', 'email', 'name', 'status', 'ip_address', 'location', 'password', 'description']
        });
    }
    async login(userDto: CreateUserDto): Promise<boolean | any> {
        const findEmail = await this.findByEmailLogin(userDto);

        if (!findEmail) {
            return this.utilsService.throw(0, 'Указанный email не существует');
        }
        const bytes = CryptoJS.AES.decrypt(findEmail.password, '02aab0f70eca03ff2e2397cb91076262');
        const decodePassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (decodePassword !== userDto.password) {
            return this.utilsService.throw(0, 'Указанный пароль не верный');
        }
        return JSON.stringify({
            success: 1,
            data: await this.utilsService.encrypt(JSON.stringify(findEmail))
        });
    }

    async setInformation(userDto: CreateUserDto): Promise<boolean | any> {
        try {
            let res = await this.userModel.update(userDto, {where: {id: userDto.user_id}})
            if (res[0] === 1) {
                let res = await this.birthdayModel.update(userDto, {where: {user_id: userDto.user_id}})
                if (res[0] === 1) {
                    const findById = await this.findById(userDto.user_id);
                    return JSON.stringify({
                        success: 1,
                        data: await this.utilsService.encrypt(JSON.stringify(findById))
                    });
                } else {
                    return this.utilsService.throw(0, 'Ошибка обновления Дня рождения');
                }
            } else {
                return this.utilsService.throw(0, 'Ошибка обновления');
            }
        } catch (e) {
            console.log(e)
        }
    }

    async setSpecialization(userDto: CreateSpecializationDto): Promise<boolean | any> {
        let res = await this.specializationModel.update(userDto, {where: {user_id: userDto.user_id}});
        if (res[0] === 1) {
            const findById = await this.findById(userDto.user_id);
            return JSON.stringify({
                success: 1,
                data: await this.utilsService.encrypt(JSON.stringify(findById))
            });
        } else {
            return this.utilsService.throw(0, 'Ошибка обновления!');
        }
    }

    async setContacts(userDto: CreateContactsDto): Promise<boolean | any> {
        let res = await this.contactsModel.update(userDto, {where: {user_id: userDto.user_id}});
        if (res[0] === 1) {
            const findById = await this.findById(userDto.user_id);
            return JSON.stringify({
                success: 1,
                data: await this.utilsService.encrypt(JSON.stringify(findById))
            });
        } else {
            return this.utilsService.throw(0, 'Ошибка обновления!');
        }
    }

    async changingUser(user: CreateUserDto): Promise<any[]> {
        const findUser = await this.findById(user.id);
        if (findUser){
             console.log(user.role_id)

        }
        return null
    }
}