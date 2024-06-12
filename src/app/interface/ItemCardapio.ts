import { Cardapio } from "./Cardapio";

export interface ItemCardapio {
    cardapio: Cardapio,
    quantidade: number
    valor?: number,
    cardapioId?: number,
    pedidoId?: number

}
