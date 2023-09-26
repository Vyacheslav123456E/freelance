import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Utils} from "../utils";
import * as CryptoJS  from 'crypto-js'
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel(User) private userModel: typeof User,
                private utilsService: Utils) {}

    async userInfo(payload: string) {
        const res = await this.userModel.findAll({where: {email: payload}});
        return JSON.stringify(res, null, 2);
    }

    async getRegistration(userDto: CreateUserDto): Promise<boolean | any> {
        const findEmail = await this.findByEmail(userDto.email);
        if (findEmail) {
            return JSON.stringify({success: 0, message: 'Указанный email уже существует'});
        }
       // const hashPassword = await bcrypt.hash(userDto.password, 5);
        let hashPassword = await this.utilsService.encrypt(JSON.stringify(userDto.password))
        Object.assign(userDto, {password: hashPassword});
        const response = await this.userModel.create(userDto);

        if (response) {
            return JSON.stringify({
                success: 1,
                data: await this.utilsService.encrypt(JSON.stringify(response))
            });
        }
    }
    async findByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({
            where: {email}});
    }

    async getLogin(userDto: CreateUserDto): Promise<boolean | any> {
        const findEmail = await this.findByEmail(userDto.email);
        if (!findEmail) {
            return this.utilsService.throw(0,  'Указанный email не существует');
        }
       // const decodePassword = await bcrypt.compareSync(userDto.password,findEmail.password)
        const bytes  = CryptoJS.AES.decrypt(findEmail.password, '02aab0f70eca03ff2e2397cb91076262');
        const decodePassword =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (decodePassword !== userDto.password) {
            return this.utilsService.throw(0,  'Указанный пароль не верный');
        }
        return JSON.stringify({
            success: 1,
            data: await this.utilsService.encrypt(JSON.stringify(findEmail))
        });
    }
}