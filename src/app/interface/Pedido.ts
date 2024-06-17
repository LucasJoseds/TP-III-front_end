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
    Aguardando = "Aguardando",
    Preparando = "Preparando",
    Finalizado = "Finalizado",
    Cancelado = "Cancelado"
}