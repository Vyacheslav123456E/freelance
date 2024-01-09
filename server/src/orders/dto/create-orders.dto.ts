export class CreateOrdersDto {
    readonly id: number;
    readonly title: string;
    readonly categories: string;
    readonly description: string;
    readonly tags: string;
    readonly price: string;
    readonly files: string;
    readonly type_price: string
    readonly createdAt: Date;
    readonly responses: number;
    readonly user_id: number;
}