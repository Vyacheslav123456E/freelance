import * as CryptoJS  from 'crypto-js';
import {NotificationPlacement} from "antd/es/notification/interface";

export const type_price = [
    {value: 'за проект', label: 'за проект'},
    {value: 'зa час', label: 'за час'},
]

export const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default class Utils{
    static async decrypt (hex: string): Promise<any>{
        const bytes  = CryptoJS.AES.decrypt(hex, '02aab0f70eca03ff2e2397cb91076262');
        return  bytes.toString(CryptoJS.enc.Utf8);
    }
    static async encrypt(hex: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(CryptoJS.AES.encrypt(hex, '02aab0f70eca03ff2e2397cb91076262').toString());
        })
    }
    static async userInfo (){
        const hexUser: any = await getStorage()
        if (hexUser) {
          return   JSON.parse(await Utils.decrypt(hexUser));
        }
    }
}
export const getStorage = (): Promise<any> =>
    new Promise((resolve, reject) => {
        try{
            resolve(localStorage.getItem('_in'));
        } catch (e) {
            reject(e)
        }
    }).catch(e => console.log(e))

export const setStorage = (payload: any): Promise<any> =>
    new Promise((resolve, reject) => {
        try{
            resolve(localStorage.setItem('_in',payload));
        } catch (e) {
            reject(e)
        }
    }).catch(e => console.log(e));

export const removeStorage = (): Promise<any> =>
    new Promise((resolve, reject) => {
        try{
            localStorage.removeItem('_in')
            resolve(true);
        } catch (e) {
            reject(e)
        }
    }).catch(e => console.log(e))

export const views_ph = (int: number, array: any[]) =>{
    return (array = ['просмотр', 'просмотра', 'просмотров'])
        && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
}

export const response_ph = (int: number, array: any[]) =>{
    return (array = ['отклик', 'отклика', 'откликов'])
        && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
}