export interface IOrder {
    id: number;
    title: string;
    categories: string;
    description: string;
    tags: string;
    price: string;
    files: string;
    type_price: string;
    createdAt: Date;
    views: number
    responses: number;
    count: number;
}