export interface IUser {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address1: string;
    address2: string;
    country: string;
}

export interface ICart {
    product_id: number,
    amount: number,
}

export interface IComment {
    name: string,
    rate: number,
    content: string,
    product_id: number,
}