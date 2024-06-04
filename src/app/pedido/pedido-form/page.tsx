"use client";

import { Cardapio } from "@/app/interface/Cardapio";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


export interface ItemCardapio {
    cardapio: Cardapio,
    quantidade: number

}

export default function PedidoForm() {

    const searchParams = useSearchParams();
    const pedido = searchParams.get('cardapioIds');
    const [items, setItems] = useState<ItemCardapio[]>(JSON.parse(localStorage.getItem('pedido') || '[]'));



    async function fetchCardapio(id: number): Promise<Cardapio> {

        const result = await fetch(`http://localhost:5284/api/cardapio?Id=${id}`, {
            method: 'GET'
        });

        return result.json();
    }


    useEffect(() => {
        if (!pedido) return;

        const parsedPedido = parseInt(pedido);
        fetchCardapio(parsedPedido)
            .then(data => {              
                const newItem: ItemCardapio = {
                    cardapio: data,
                    quantidade: 1 // Por enquanto, vamos definir a quantidade como 1
                };
                // Adicione o novo item ao estado items
                setItems([...items, newItem]);
                
            })
            .catch(() => {
                // Trate erros, se necessário
            });
    }, [pedido]);

    
    return (
        <div>
            <h1>Pedido</h1>
            {items.map(item => (
                <div key={item.cardapio.id}>
                    <h2>{item.cardapio.nome}</h2>
                    <p>{item.cardapio.descricao}</p>
                    <p>{item.quantidade}</p>
                    <p>Preço: R$ {item.cardapio.preco},00</p>
                </div>
            ))}
            <button >Confirmar Pedido</button>
            <Link href="/cardapio/cardapio-list" className={buttonVariants({ variant: 'outline' })} >Adicionar mais itens</Link>
        </div>
    );
}