import * as CryptoJS  from 'crypto-js'

export default class Utils{
    static async decrypt (hex: string): Promise<any>{
        const bytes  = CryptoJS.AES.decrypt(hex, '02aab0f70eca03ff2e2397cb91076262');
        return  bytes.toString(CryptoJS.enc.Utf8);
    }
}