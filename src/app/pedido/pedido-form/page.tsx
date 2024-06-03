"use client";

import { Cardapio } from "@/app/interface/Cardapio";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import  Link  from "next/link";
import { buttonVariants } from "@/components/ui/button";


export default function PedidoForm(){

    const router = useRouter();
    const searchParams = useSearchParams();
    const pedido = searchParams.get('cardapioIds');
    const [items, setItems] = useState<Cardapio[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (pedido) {
            try {
        
                const fetchItems = async () => {
                    try {
                        const parsedPedido = parseInt(pedido);
                
                        const response = await fetch(`http://localhost:5284/api/cardapio?Id=${parsedPedido}`,{
                            method:'GET'
                        });
                        if (!response.ok) {
                            throw new Error('Erro ao buscar itens do cardápio');
                        }
                        const data = await response.json();
                        console.log(data);
                
                        // Verificar se o item já existe na lista
                        if (!items.some(item => item.id === data.id)) {
                            setItems(prevItems => [...prevItems, data]);
                        }
                    } catch (error) {
                        setError('Erro ao carregar itens do pedido');
                    }
                };
    
                fetchItems();
            } catch (error) {
                setError('Erro ao carregar itens do pedido');
            }
        }
    }, [pedido]);
    
    const handleOrderSubmit = () => {
        // Handle order submission logic here
        console.log(items);
    };

    if (error) {
        return <div>Erro ao carregar pedido: {error}</div>;
    }

    if (items.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Pedido</h1>
            {items.map(item => (
                <div key={item.id}>
                    <h2>{item.nome}</h2>
                    <p>{item.descricao}</p>
                    <p>Preço: R$ {item.preco},00</p>
                </div>
            ))}
            <button onClick={handleOrderSubmit}>Confirmar Pedido</button>
            <Link href="/cardapio/cardapio-list" className={buttonVariants({variant:'outline'})} >Adicionar mais itens</Link>
        </div>
    );
}