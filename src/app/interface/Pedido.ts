import { ItemCardapio } from "../pedido/pedido-form/page";
import { Cardapio } from "./Cardapio";
import { Cliente } from "./Cliente";

export interface Pedido{
    id:number,
    itens?: {
        quantidade: number;
        valor: number;
        cardapioId: number;
    }[];
    clienteId:number,
    numeroMesa: number
}