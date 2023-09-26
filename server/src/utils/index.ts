import * as CryptoJS  from 'crypto-js'

export class Utils {
    public async validNumber(phone: string) {
        let first = phone.substr(0, 2);
        if (Number(first) !== 89) {
            return false;
        } else {
            return true;
        }
    }
    public async throwBlocking(){
       return {success: 0, message: 'Пользователь заблокирован'}
    }
    public async throw(success,message){
        return JSON.stringify({success: success, message: message});
    }
    public async encrypt(hex: string) {
        return CryptoJS.AES.encrypt(hex, '02aab0f70eca03ff2e2397cb91076262').toString();
    }
    public async decrypt(hex: string) {
        const bytes  = CryptoJS.AES.decrypt(hex, '02aab0f70eca03ff2e2397cb91076262');
        return  bytes.toString(CryptoJS.enc.Utf8);
    }
}