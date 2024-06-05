"use client";

import { Cardapio } from "@/app/interface/Cardapio";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@mui/material/Icon';
import { green } from "@mui/material/colors";
import { Badge } from "@/components/ui/badge";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { Pedido } from "@/app/interface/Pedido";
import { Cliente } from "@/app/interface/Cliente";


export interface ItemCardapio {
    cardapio: Cardapio,
    quantidade: number
    valor?: number,
    cardapioId?: number,
    pedidoId?: number

}

export default function PedidoForm() {

    const [items, setItems] = useState<ItemCardapio[]>([]);
    const [total, setTotal] = useState(0);
    const [numeroMesa, setNumeroMesa] = useState(0);
    const clienteId=2;
  

    useEffect(() => {
        const currentOrder = JSON.parse(localStorage.getItem("pedido") || "[]");
        setItems(currentOrder);
        calculateTotal(currentOrder)
    }, []);


    function calculateTotal(items: ItemCardapio[]) {
        const total = items.reduce((acc, item) => {
            return acc + item.cardapio.preco * item.quantidade;
        }, 0);
        setTotal(total);
    }

    const handleSubmit = async () => {
        const currentOrder = JSON.parse(localStorage.getItem("pedido") || "[]") as ItemCardapio[];

        const pedidoData: Pedido = {
            id: 0,
            cliente: clienteId,
            itens: currentOrder.map((item) => ({
                quantidade: item.quantidade,
                valor: item.cardapio.preco * item.quantidade,
                cardapio: item.cardapio, // Adicionando o objeto cardapio ao item de pedido
              })),
            numeroMesa: numeroMesa
        };
        try {
            const response = await fetch('http://localhost:5284/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sucesso:', data);
            } else {
                console.error('Erro na requisição');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };


    return (
        <div>
            <h1 className="scroll-m-15 text-3xl font-bold tracking-tight center-title">Itens do Pedido</h1>
        
                <div className="row gap-8 mt-3">
                    {items.map(item => (
                        <Card className="mt-3" key={item.cardapio.id}>
                            <CardHeader className="flex-row gap-4 items-center">
                                <CardTitle>{item.cardapio.nome}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="flex-row gap-4 items-centers">{item.cardapio.descricao}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <p className="font-bold">R$ {item.cardapio.preco},00</p>
                                <Badge variant={"destructive"}>{item.quantidade}</Badge>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between">
                    <h2 className="mt-4 font-bold">Total: {total.toFixed(2)}</h2>
                    <input type="number" value={numeroMesa} onChange={e => setNumeroMesa(parseInt(e.target.value))} placeholder="Número da Mesa" />
                    <Link className="mt-4" href={"/cardapio/cardapio-list"}>
                        <FaPlusCircle size={25} />
                    </Link>

                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center mt-4">
                        <span className="w-full border-t"></span>
                    </div>
                </div>

                <div className="grid w-full items-center gap-4">

                    <Button className="mt-10" variant={"destructive"} onClick={handleSubmit}>Confirmar Pedido</Button>
                </div>
           
        </div>
    );
}