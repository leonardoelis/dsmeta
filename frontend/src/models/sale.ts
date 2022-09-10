// arquivo usado para especificar um tipo de dado que será usado no retorno das chamadas à API do backend
export type Sale = {
    id: number;
    sellerName: string;
    date: string;
    visited: number;
    deals: number;
    amount: number;
}