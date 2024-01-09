export interface IUser {
    readonly id: number;
    readonly name: string;
    readonly password: string;
    readonly success: number;
    readonly message: string;
    readonly role_id: number
}