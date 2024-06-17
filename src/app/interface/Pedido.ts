import { Cardapio } from "./Cardapio";


export interface Pedido{
    id:number,
    itens?: {
        quantidade: number;
        valor: number;
        cardapioId: number;
        cardapio:Cardapio
    }[];
    status?:StatusPedido,
    clienteId:number,
    numeroMesa: number
    dataPedido?:Date
}
export enum StatusPedido {
    Preparando = "Preparando",
    Entregue = "Entregue",
    Cancelado = "Cancelado"
}