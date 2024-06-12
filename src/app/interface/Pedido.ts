import { Cardapio } from "./Cardapio";


export interface Pedido{
    id:number,
    itens?: {
        quantidade: number;
        valor: number;
        cardapioId: number;
        cardapio:Cardapio
    }[];
    status?:string,
    clienteId:number,
    numeroMesa: number
    dataPedido?:Date
}